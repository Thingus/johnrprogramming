import styles from "./cv.module.css"
export default function CV() {
  return (<div className={styles.card_grid}>
    
    <div className={styles.card}>
      <h2>Current role: backend engineer at Flowminder (2021-present)</h2>
<p>I currently work at the <a href="www.flowminder.org">Flowminder Foundation</a>, a nonprofit that leverages large datasets for humanitarian ends. During my time there, I:</p>
<ul>
<li>work to support the development of novel methods of tracking and communicating population displacement via mobile network operator data.</li>
<li>work with the analysis team to convert these methods into automated data pipelines, including ensuring that no individual person could be tracked using our data.</li>
<li>maintain and extend our <a href="https://haiti.mobility-dashboard.org/">Haiti mobility dashboard</a>. </li>
<li>implement <a href="https://www.flowminder.org/resources/publications-reports/tag/preparedness-report">automated reports</a> to deliver our indicators to stakeholders. These are designed by our marketing and comms manager in Figma and implemented using Python, Jinja2, HTML and Weasyprint.</li>
<li>contribute to <a href="https://github.com/Flowminder/FlowKit">Flowkit</a>, our PostgreSQL and Python MNO data toolkit. Notable contributions include exposing queries internally via RESTful API endpoints, and restricting the time and resolution of these queries to authenticated roles via JWT.</li>
<li>have worked with our Haitian consultant to produce (as a short project) an <a href="https://johnrprogramming.com/haiti_map.html">animated map</a> based on ACLED data to illustrate the ongoing violence in Haiti.</li>
</ul>
    </div>
    
    <div className={styles.card}>
      <h2>Previous role: research software engineer at the CLCR (2016-2021)</h2>
<p>My previous role was at the Centre for Landscape and Climate Research at the University of Leicester, an ecosystem monitoring research group. While there, I:</p>
<ul>
<li>wrote the first version of Python For Earth Observation (<a href="https://github.com/clcr/pyeo">Pyeo</a>), an open-source library used internally for working with satellite images.</li>
<li>implemented the Forest Alerts automated deforestation detection system, a Pyeo-powered monitoring system based on Sentinel-2 high-resolution satellite imagery for delivering alerts to users via email and Android app.</li>
<li><a href="https://le.ac.uk/news/2021/july/forest-alert">showcased</a> the above to the President of Kenya as part of the Year of Climate Action. At the time of my employment ending with the CLCR, Forest Sentinel was being actively used by the Kenyan Forestry Service.</li>
<li>supported other research efforts in the CLCR and related research groups. Examples include measuring rocketry emissions via the TROPOMI atmospheric sensor and (in partnership with <a href="https://previsico.com/">Previsico</a>), using synthetic aperture radar to measure the extent of flooding in urban areas. </li>
</ul>
    </div>
    
    <div className={styles.card}>
      <h2>Other previous work</h2>
<ul>
<li><em>Teaching fellow at the School of Systems Engineering, University of Reading (2013-2016)</em>: I delivered four modules a year; information security, advanced databases, operating systems and advanced computation. The largest of these was information security, delivered to a cohort of 200+ students over two year groups. All of these modules involved both coursework and exams.</li>
<li><em>Postgraduate researcher at the Department of Cybernetics, University of Reading (2011-2016)</em>: I was working towards a PhD in terahertz spectroscopy of solvation shells; an experimental research program using the UoR&apos;s dispersive Fourier transform spectrometer (DFTS). As part of this research I overhauled the DFTS control system, prototyped a novel sample cell and carried out measurements of samples.</li>
</ul>
    </div>
    
    <div className={styles.card}>
      <h2>Software development</h2>
<p>Python is my most used language - I have been a professional Python developer for ten years, and have been using the language for seventeen. I aim to write legible Python, making full use of type annotations, dataclasses and autoformatters where appropriate.</p>
<ul>
<li>Scientific stack: I have worked extensively with Pandas, Numpy and PostgreSQL for scientific analysis. I have both implemented and adapted Jupyter notebooks for published scientific work.</li>
<li>Web technology: I have implemented backend APIs in Quart (asynchronous Flask) and FastAPI. I have also had extensive experience in Jinja for HTML templating and especially PDF rendering.</li>
<li>Database technologies: I have implemented small databases mainly in PostgreSQL and MySQL, and contributed patches to Flowminder&apos;s main cellular data record processing toolkit. I have also worked briefly in Oracle and recently reimplemented a database in Access as a personal favour.</li>
<li>Frontend: I have implemented a Java Android application to demonstrate the Forest Sentinel deforestation monitoring system. I also maintain our Haiti mobility dashboard, implemented in React.</li>
<li>Security: I have worked with Auth0 and implemented secure APIs. I also implemented a JWT-powered scope-checking system for Flowminder&apos;s main query engine.</li>
</ul>
    </div>
    
    <div className={styles.card}>
      <h2>Other Technical Skills</h2>
<p>In addition to implementing techniques, I have often been responsible for implementing the infrastructure around scientific reporting projects. I would not call myself an administrator, but I am comfortable managing services hosting on both physical and cloud infrastructure.</p>
<ul>
<li>Containerisation: Docker is my preferred container management engine, using Docker Compose for service management. I have touched on Docker Hive. I have no experience with Kubernertes.</li>
<li>Data pipelines: During my work at Flowminder, I have been implementing batch processing pipelines using Airflow. I have implemented fanouts, mapped tasks and dynamically constructed DAGs using Papermill templates; I am also familiar with both Operator- and Task- styles of dag implementations.</li>
<li>Workflow: I am experienced with Git, and my working environment is Bash + VSCode on Ubuntu. I have implemented automated testing pipelines on CircleCI, and am an occasional user of Makefiles.</li>
<li>Environment management: I am experienced with pip, pyenv, pipenv, conda and UV for Python, and am familiar with Node and NPM/Yarn for Javascript development.</li>
<li>Cloud infrastructure: I have experience with Google Cloud and AWS, running managed compute instances, containerised apps and supplemental technologies including IAM, Terraform and hosted database services)</li>
</ul>
    </div>
    
    <div className={styles.card}>
      <h2>Soft skills</h2>
<p>Most of my work is supporting academic research; this varies from delivering one-to-one support to operationalising sophisticated techniques in concert with an entire research group. </p>
<ul>
<li><em>Research software engineer:</em> I have spent the majority of my career working with scientists and academics, implementing their techniques. I am used to adapting or rewriting research modules into larger systems while working closely with the original designer to ensure that the results do not drift.</li>
<li><em>International work:</em> Many of my projects have been in collaboration with international projects - I have worked with the Kenyan Forestry Service, CONFAOR, IPAM and the Mexican space agency, among others. I have experience identifying key technical partners to work with for delivering the most impact in limited projects.</li>
<li><em>Presentation skills:</em> I have four years experience delivering undergraduate lectures. I have also presented research at academic conferences and delivered courses in professional settings.</li>
<li><em>Teaching and mentorship:</em> In addition to my teaching experience, I have mentored junior engineers and run several courses for coworkers in good programming practice, version control and machine learning.</li>
</ul>
    </div>
    
    <div className={styles.card}>
      <h2>Qualifications</h2>
<ul>
<li>BSC Robotics (2013)</li>
<li>Associate Fellow of the College of Higher Education (2014)</li>
<li>Cryogenic safety training (2013)</li>
<li>Laser safety training (2014)</li>
<li>Basic first aid (lapsed) (2016)</li>
</ul>
    </div>
    
  </div>)
}