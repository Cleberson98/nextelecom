"""Empacota o site estático para revisão na infraestrutura da Nex."""

from argparse import ArgumentParser
from pathlib import Path
from tempfile import NamedTemporaryFile
from zipfile import ZIP_DEFLATED, ZipFile


PROJECT = Path(__file__).resolve().parent
DIST = PROJECT / "dist"
ROUTES = ("internet", "movel", "cam", "svas", "empresarial", "quem-somos", "indique", "contato")
ASSET_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".avif", ".svg", ".woff2", ".ico"}


def package_staging(output):
    index = (DIST / "index.html").read_text(encoding="utf-8")
    if "</head>" not in index:
        raise ValueError("O index.html precisa conter o fechamento de <head>.")

    index = index.replace(
        "</head>", '<meta name="robots" content="noindex,nofollow"></head>', 1
    )
    scripts_and_styles = sorted(
        file for file in DIST.iterdir() if file.is_file() and file.suffix in {".js", ".css"}
    )
    assets = sorted(
        file for file in (DIST / "assets").rglob("*")
        if file.is_file() and (
            file.suffix.lower() in ASSET_EXTENSIONS
            or (file.name == "index.html" and file.is_relative_to(DIST / "assets" / "tutoriais"))
        )
    )

    output.parent.mkdir(parents=True, exist_ok=True)
    with NamedTemporaryFile(dir=output.parent, suffix=".zip", delete=False) as temporary:
        temporary_path = Path(temporary.name)

    try:
        with ZipFile(temporary_path, "w", compression=ZIP_DEFLATED) as archive:
            archive.write(PROJECT / "HOMOLOGACAO.md", "HOMOLOGACAO.md")
            archive.write(PROJECT / "REVISAO.md", "REVISAO.md")
            archive.writestr("site/index.html", index)
            # Cada rota tem seu próprio index para recarregar em servidores estáticos.
            for route in ROUTES:
                archive.writestr(f"site/{route}/index.html", index)

            for file in scripts_and_styles + assets:
                relative = file.relative_to(DIST).as_posix()
                archive.write(file, f"site/{relative}")

        temporary_path.replace(output)
    finally:
        temporary_path.unlink(missing_ok=True)


if __name__ == "__main__":
    parser = ArgumentParser(description=__doc__)
    parser.add_argument(
        "--output",
        type=Path,
        default=PROJECT.parent / "release-output" / "nextelecom-homologacao.zip",
        help="Caminho do arquivo ZIP de saída",
    )
    destination = parser.parse_args().output.resolve()
    package_staging(destination)
    print(f"Pacote de homologação gerado em {destination}")
