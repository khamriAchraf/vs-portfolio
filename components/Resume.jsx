import styles from "@/styles/Resume.module.css";
import Link from "next/link";
import { useCallback } from "react";
import { useTranslation, Trans } from 'react-i18next'

export default function Resume() {
  const { t } = useTranslation()
  const itemTags = [
    ["GitLab CI", "Terraform", "Ansible", "Kubernetes", "OpenStack"],
    ["Java", "Oracle", "Git", "Jenkins"],
    ["Azure", "GCP", "Python", "FastAPI"],
    ["React", "Express", "MongoDB"],
    ["ITIL", "COBIT", "ITSM"],
  ];

  const handleDownload = useCallback(() => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.setAttribute("download", "resume.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);
  return (
    <>
      <section className={styles.nameSection}>
        <h1 className={styles.name}>{t('achrafKhamri2', 'Achraf KHAMRI')}</h1>
        <p className={styles.role}>{t('softwareEngineer', 'Software Engineer')}</p>
        <div className={styles.location}><Trans i18nKey="spanClassnamestylesdotParisLyonFrance"><span className={styles.dot} />
          Paris / Lyon, France</Trans></div>
      </section>
      <div className={styles.resumeContainer}>
        <section className={styles.experience}>
          <h3 className={styles.sectionTitle}>{t('professionalExperience', 'Professional Experience')}</h3>

          <div className={styles.enedisItem}>
            <div className={styles.itemContent}>
              <div className={styles.itemHeader}>
                <div>
                  <h3>{t('devsecopsEngineer', 'DevSecOps Engineer')}</h3>
                  <p>{t('enedis2026', 'Enedis, 2026')}</p>
                </div>
                <Link href="https://www.enedis.fr/" target="_blank">
                  <img
                    src="/enedis.png"
                    alt={t("enedisLogo", "Enedis")}
                    className={styles.image}
                  />
                </Link>
              </div>
              <div className={styles.skillTags}>
                {itemTags[0].map((skill) => (
                  <span key={skill} className={styles.skillTag}>
                    {skill}
                  </span>
                ))}
              </div>

              <p>
                {t('memberOfThePlatformSystemTeamContributingToTheAdoptionOfDevopsPracticesAndTheImprovementOfCicdPipelines', 'Member of the Platform System Team, contributing to the adoption\r\n                of DevOps practices and the improvement of CI/CD pipelines.')}
              </p>
              <ul>
                <li>
                  {t('contributedToInfrastructureAndDeploymentAutomationAndIndustrializationUsingTerraformKubernetesAndOpenstack', 'Contributed to infrastructure and deployment automation and\r\n                  industrialization using Terraform, Kubernetes and OpenStack.')}
                </li>
                <li>
                  {t('automatedInfrastructureTestingUsingAnsibleMoleculeAndOpenstack', 'Automated infrastructure testing using Ansible, Molecule and\r\n                  OpenStack.')}
                </li>
                <li>
                  {t('automatedTheDeploymentOfGitlabCiRunnersUsingAPythonCli', 'Automated the deployment of GitLab CI runners using a Python\r\n                  CLI.')}
                </li>
                <li>
                  {t('contributedToUpskillingDevelopmentTeamsAcrossTheDepartment', 'Contributed to upskilling development teams across the\r\n                  department.')}
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.dxcItem}>
            <div className={styles.itemContent}>
              <div className={styles.itemHeader}>
                <div>
                  <h3>{t('softwareEngineer', 'Software Engineer')}</h3>
                  <p>{t('dxcTechnology20242025', 'DXC Technology, 2024 - 2025')}</p>
                </div>
                <Link href="https://www.dxc.com/" target="_blank">
                  <img src="/dxc.png" alt={t("dxcLogo", "DXC")} className={styles.image} />
                </Link>
              </div>
              <div className={styles.skillTags}>
                {itemTags[1].map((skill) => (
                  <span key={skill} className={styles.skillTag}>
                    {skill}
                  </span>
                ))}
              </div>
              <p>
                {t('contributedToTheDevelopmentOfRadianceALargescalePolicyAdministrationPlatformUsedByAsrALeadingDutchInsuranceCompanyForManagingLifeAndDisabilityInsuranceProducts', 'Contributed to the development of RADIANCE, a large-scale policy\r\n                administration platform used by ASR, a leading Dutch insurance\r\n                company, for managing life and disability insurance products.')}
              </p>
              <ul>
                <li>
                  {t('contributedToTheRadianceParserAndLexerAddingSupportForNewDomainspecificKeywords', 'Contributed to the RADIANCE parser and lexer, adding support\r\n                  for new domain-specific keywords.')}
                </li>
                <li>
                  {t('participatedInTheImplementationOfConcurrentDatabaseAccessForImprovedPerformance', 'Participated in the implementation of concurrent database\r\n                  access for improved performance.')}
                </li>
                <li>
                  {t('fixedBugsAndAddedFeaturesToTheDeveloperGraphicalInterfaceAnEclipsePluginUsedByTheClient', 'Fixed bugs and added features to the developer graphical\r\n                  interface, an Eclipse plugin used by the client.')}
                </li>
                <li>
                  {t('contributedToThreeMajorMigrationsFromCvsToGitMaven1ToMaven3AndHudsonToJenkins', 'Contributed to three major migrations: from CVS to Git, Maven\r\n                  1 to Maven 3, and Hudson to Jenkins.')}
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.carrefourItem}>
            <div className={styles.itemContent}>
              <div className={styles.itemHeader}>
                <div>
                  <h3>{t('cloudDevopsEngineer', 'Cloud / DevOps Engineer')}</h3>
                  <p>{t('carrefourFrance20232024', 'Carrefour France, 2023 - 2024')}</p>
                </div>
                <Link href="https://carrefour.fr/" target="_blank">
                  <img
                    src="/carrefour.png"
                    alt={t("carrefourLogo", "Carrefour")}
                    className={styles.image}
                  />
                </Link>
              </div>
              <div className={styles.skillTags}>
                {itemTags[2].map((skill) => (
                  <span key={skill} className={styles.skillTag}>
                    {skill}
                  </span>
                ))}
              </div>
              <p>
                {t('memberOfTheVpodTeamResponsibleForManagingAndEvolvingCarrefoursCloudEnvironmentsAcrossMicrosoftAzureAndGoogleCloudPlatformGcpAsWellAsHandlingInfrastructureRequests', 'Member of the vPOD team, responsible for managing and evolving\r\n                Carrefour\'s Cloud environments across Microsoft Azure and Google\r\n                Cloud Platform (GCP), as well as handling infrastructure\r\n                requests.')}
              </p>
              <ul>
                <li>
                  {t('managedAndMaintainedMulticloudEnvironmentsAzureAndGcpIncludingVirtualMachinesConfigurationsAndInfrastructureResources', 'Managed and maintained multi-cloud environments (Azure and\r\n                  GCP), including virtual machines, configurations and\r\n                  infrastructure resources.')}
                </li>
                <li>
                  {t('gestionDesWorkloadsKubernetesSurAzureAksEtDesTchesPlanifiesCronjobs', 'Gestion des workloads Kubernetes sur Azure (AKS) et des tâches\r\n                  planifiées (CronJobs).')}
                </li>
                <li>
                  {t('provisionnementEtVolutionDesInfrastructuresAvecTerraformInfrastructureAsCode', 'Provisionnement et évolution des infrastructures avec\r\n                  Terraform (Infrastructure as Code).')}
                </li>
                <li>
                  {t('automatisationDesOprationsDinfrastructureViaDesWorkflowsGitopsEtDesPipelinesCicd', 'Automatisation des opérations d’infrastructure via des\r\n                  workflows GitOps et des pipelines CI/CD.')}
                </li>
                <li>
                  {t('dveloppementEtMaintenanceDapiPythonFlaskfastapiPourAutomatiserLeTraitementDesDemandesDinfrastructureCloud', 'Développement et maintenance dAPI Python (Flask/FastAPI) pour\r\n                  automatiser le traitement des demandes dinfrastructure Cloud.')}
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.addItem}>
            <div className={styles.itemContent}>
              <div className={styles.itemHeader}>
                <div>
                  <h3>{t('softwareEngineer', 'Software Engineer')}</h3>
                  <p>{t('agenceDeDveloppementDuDigital20222023', 'Agence de Développement du Digital, 2022 - 2023')}</p>
                </div>
                <Link href="https://www.add.gov.ma/" target="_blank">
                  <img src="/add.png" alt={t("addLogo", "ADD")} className={styles.image} />
                </Link>
              </div>
              <div className={styles.skillTags}>
                {itemTags[3].map((skill) => (
                  <span key={skill} className={styles.skillTag}>
                    {skill}
                  </span>
                ))}
              </div>
              <p>
                {t('builtAnInternalTicketingSystemToCentralizeServiceRequests', 'Built an internal ticketing system to centralize service\r\n                requests.')}
              </p>
              <ul>
                <li>{t('developedTheWebAppAndDeployedItOnpremise', 'Developed the web app and deployed it on-premise.')}</li>
              </ul>
            </div>
          </div>

          <div className={styles.addItem}>
            <div className={styles.itemContent}>
              <div className={styles.itemHeader}>
                <div>
                  <h3>{t('itsmItGovernanceConsultant', 'ITSM & IT Governance Consultant')}</h3>
                  <p>{t('agenceDeDveloppementDuDigital20222023', 'Agence de Développement du Digital, 2022 - 2023')}</p>
                </div>
                <Link href="https://www.add.gov.ma/" target="_blank">
                  <img src="/add.png" alt={t("addLogo", "ADD")} className={styles.image} />
                </Link>
              </div>
              <div className={styles.skillTags}>
                {itemTags[4].map((skill) => (
                  <span key={skill} className={styles.skillTag}>
                    {skill}
                  </span>
                ))}
              </div>
              <p>
                {t('contributedToOrganizationalChangeManagementInitiativesSupportingTheImplementationOfAnEnterprisewideItGovernanceFramework', 'Contributed to organizational change management initiatives\r\n                supporting the implementation of an enterprise-wide IT\r\n                governance framework.')}
              </p>
              <ul>
                <li>
                  {t('formalizedAndDocumentedItsmProcessesIncludingIncidentProblemAndChangeManagement', 'Formalized and documented ITSM processes, including Incident,\r\n                  Problem and Change Management.')}
                </li>
                <li>
                  {t('participatedInItGovernanceCommitteesAndContributedToDefiningServiceLevelIndicatorsSlisObjectivesSlosAndAgreementsSlas', 'Participated in IT governance committees and contributed to\r\n                  defining Service Level Indicators (SLIs), Objectives (SLOs)\r\n                  and Agreements (SLAs).')}
                </li>
                <li>
                  {t('definedMonitoringRequirementsAndDevelopedPowerBiDashboardsToTrackAndAssessServiceQuality', 'Defined monitoring requirements and developed Power BI\r\n                  dashboards to track and assess service quality.')}
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className={styles.education}>
          <div className={styles.buttonContainer}>
            <button className={styles.button} onClick={handleDownload}>
              {t('downloadPdfVersion', 'Download PDF Version')}
            </button>
          </div>
          <div className={styles.badges}>
            <h3 className={styles.sectionTitle}>{t('badgeCollection', 'Badge Collection')}</h3>
            <div className={styles.badgeContainer}>
              <Link
                href="https://www.credly.com/badges/f0b4cf7c-b745-4efe-a7d0-3f536f1f511b"
                target="_blank"
              >
                <img src="/azure.png" alt={t("azureBadge", "Azure")} className={styles.badge} />
              </Link>
              <Link
                href="https://www.credly.com/badges/8c5e1715-dd4e-4567-9b2d-524d2af09ca9"
                target="_blank"
              >
                <img
                  src="/powerbi.png"
                  alt={t("powerBiBadge", "Power BI")}
                  className={styles.badge}
                />
              </Link>
              <Link
                href="https://www.credly.com/badges/b34edc85-4240-4976-9c07-5ecace834572"
                target="_blank"
              >
                <img src="/psd.png" alt={t("psdBadge", "PSD")} className={styles.badge} />
              </Link>

              <Link
                href="https://www.credly.com/badges/a2519aeb-731e-4d27-8440-6f30136ce6d7"
                target="_blank"
              >
                <img src="/ibm.png" alt={t("ibmBadge", "IBM")} className={styles.badge} />
              </Link>
              <Link
                href="https://www.credly.com/badges/d1a9f4d5-f2d9-4a8a-b0c0-c2c1f8d3b4f9"
                target="_blank"
              >
                <img src="/itil.png" alt={t("itilBadge", "ITIL")} className={styles.badge} />
              </Link>
              <Link
                href="https://www.credly.com/badges/3213ae57-2b7e-4984-9f4e-47cb972411e5"
                target="_blank"
              >
                <img
                  src="/vertica.png"
                  alt={t("verticaBadge", "Vertica")}
                  className={styles.badge}
                />
              </Link>
            </div>
          </div>

          <h3 className={styles.sectionTitle}>{t('education', 'Education')}</h3>

          <div className={styles.timelineItem}>
            <div className={styles.itemContent}>
              <h3>{t('masterOfScienceInInformaticsAtGrenoble', 'Master of Science in Informatics at Grenoble')}</h3>
              <p>{t('ensimagGrenobleInpUgaFrance20252026', 'Ensimag - Grenoble INP, UGA, France, 2025-2026')}</p>
            </div>
          </div>

          <div className={styles.timelineItem}>
            <div className={styles.itemContent}>
              <h3>{t('stateEngineeringDegreeInnovationAmoa', 'State Engineering Degree – Innovation & AMOA')}</h3>
              <p>
                {t('institutNationalDesPostesEtTlcommunicationsInptMorocco20192022', 'Institut National des Postes et Télécommunications (INPT),\r\n                Morocco, 2019-2022')}
              </p>
            </div>
          </div>

          <div className={styles.timelineItem}>
            <div className={styles.itemContent}>
              <h3>{t('preparatoryClassesMp', 'Preparatory Classes (MP)')}</h3>
              <p>{t('lyceMoulayYoussefMorocco20172019', 'Lycée Moulay Youssef, Morocco, 2017-2019')}</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
