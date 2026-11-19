function careers() {
  const formUrl = '/formulario-de-vagas';
  const reportUrl = 'https://nextelecom.com.br/wp-content/uploads/2026/09/RELATORIO-DE-TRANSPARENCIA-1.pdf';
  const values = [
    ['Ética', 'Agimos com integridade, transparência e responsabilidade em todas as nossas decisões e relações.'],
    ['Respeito', 'Valorizamos as pessoas, as diferenças e promovemos um ambiente de trabalho acolhedor e colaborativo.'],
    ['Inovação', 'Incentivamos novas ideias, aprendemos constantemente e utilizamos a tecnologia para transformar desafios em oportunidades.'],
    ['Comprometimento', 'Assumimos responsabilidades e buscamos entregar o nosso melhor todos os dias, com foco em resultados e excelência.'],
    ['Desenvolvimento', 'Investimos no crescimento profissional e pessoal das pessoas, porque evoluir faz parte da nossa essência.'],
    ['Trabalho em Equipe', 'Acreditamos que os melhores resultados são alcançados quando compartilhamos conhecimentos e crescemos juntos.']
  ];

  return `
    <section class="careers-hero" aria-labelledby="careers-title">
      <div class="wrap careers-hero-grid">
        <div class="careers-intro">
          <a class="breadcrumb" href="/">Início <span>/</span> Trabalhe conosco</a>
          <span class="eyebrow">Vem para o time Nex</span>
          <h1 id="careers-title">Trabalhe conosco</h1>
          <p class="careers-lead">Somos a Nex Telecom, somos a sua conexão.</p>
          <p>Venha fazer parte da Nex Telecom e cresça junto com uma empresa que conecta pessoas, transforma realidades e investe em inovação, tecnologia e desenvolvimento humano.</p>
          <a class="button blue" href="${formUrl}">Cadastrar Currículo <span aria-hidden="true">↗︎</span></a>
        </div>
        <img class="careers-photo" src="/assets/equipe-nex-carreiras.jpg" width="900" height="1100" alt="Profissional da Nex sorrindo no trabalho" fetchpriority="high">
      </div>
    </section>
    <section class="section careers-apply" aria-labelledby="careers-apply-title">
      <div class="wrap careers-apply-grid">
        <h2 id="careers-apply-title">Cadastre seu currículo.</h2>
        <div>
          <p>Quer fazer parte da nossa equipe? Acesse o formulário, selecione a área de seu interesse e envie suas informações para nosso time de talentos.</p>
          <a class="button outline" href="${formUrl}">Cadastrar Currículo <span aria-hidden="true">↗︎</span></a>
        </div>
      </div>
    </section>
    <section class="section soft" aria-labelledby="careers-values-title">
      <div class="wrap">
        <div class="section-head careers-values-heading">
          <h2 id="careers-values-title">Por que trabalhar na Nex Telecom?</h2>
          <p>Buscamos desenvolver um ecossistema que une estratégia, processos, cultura e pessoas em torno das oportunidades que as novas tecnologias trazem.</p>
        </div>
        <ul class="careers-values">
          ${values.map(([title, text]) => `<li class="reveal"><h3>${title}</h3><p>${text}</p></li>`).join('')}
        </ul>
      </div>
    </section>
    <section class="section careers-transparency" id="igualdade-salarial" aria-labelledby="careers-report-title">
      <div class="wrap careers-report">
        <div>
          <span class="eyebrow">Transparência</span>
          <h2 id="careers-report-title">Relatório de Transparência e Igualdade Salarial de Mulheres e Homens</h2>
          <span class="careers-report-period">2º Semestre de 2026</span>
        </div>
        <div>
          <p>A Nex Tecnologia da Informação Ltda. disponibiliza o Relatório de Transparência e Igualdade Salarial de Mulheres e Homens – 2º Semestre de 2026, em atendimento à Lei nº 14.611/2023.</p>
          <p>O relatório apresenta dados consolidados sobre a remuneração dos colaboradores e a composição do quadro de empregados, contribuindo para ampliar a transparência e o acompanhamento da igualdade salarial entre mulheres e homens.</p>
          <a class="button light" href="${reportUrl}" target="_blank" rel="noopener">Acessar Relatório <span aria-hidden="true">↗︎</span></a>
        </div>
      </div>
    </section>`;
}

function careersForm() {
  return `
    <section class="section careers-form-page" aria-labelledby="careers-form-title">
      <div class="wrap">
        <a class="text-link" href="/trabalheconosco">←︎ Trabalhe conosco</a>
        <h1 id="careers-form-title">Cadastre seu currículo</h1>
        <iframe class="careers-form-frame" src="https://curriculo-mail-bridge.lovable.app"
          title="Formulário de candidatura da Nex Telecom"></iframe>
        <p class="helper">Se precisar, <a class="text-link" href="https://curriculo-mail-bridge.lovable.app" target="_blank" rel="noopener">abra o formulário em uma nova aba ↗︎</a>.</p>
      </div>
    </section>`;
}
