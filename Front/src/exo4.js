function assertEqual(actual, expected, testName = '') {
  if (actual !== expected) {
    console.error(
      `[${testName}] Échec: on attendait "${expected}", on a eu "${actual}".`
    );
  } else {
    console.log(`[${testName}] OK`);
  }
}

function assertDeepEqual(actual, expected, testName = '') {
  const actualStr = JSON.stringify(actual);
  const expectedStr = JSON.stringify(expected);
  if (actualStr !== expectedStr) {
    console.error(
      `[${testName}] Échec deepEqual:\n  Attendu: ${expectedStr}\n  Reçu:    ${actualStr}`
    );
  } else {
    console.log(`[${testName}] OK`);
  }
}

function assertCloseTo(actual, expected, epsilon, testName = '') {
  if (Math.abs(actual - expected) > epsilon) {
    console.error(
      `[${testName}] Échec: on attendait quelque chose proche de "${expected}", on a eu "${actual}". (tolérance ${epsilon})`
    );
  } else {
    console.log(`[${testName}] OK`);
  }
}

function parseCsvImperative(csvText) {
  const lines = csvText.split('\n');
  const dataLines = lines.slice(1); 
  const result = [];
  for (let i = 0; i < dataLines.length; i++) {
    const line = dataLines[i].trim();
    if (!line) continue; 

    const [svn_id, real_name, website, project_name] = line.split(',');

    const siteOrNull = website && website.trim() !== '' ? website.trim() : null;

    result.push({
      username: svn_id.trim(),
      realName: real_name.trim(),
      website: siteOrNull,
      projectName: project_name.trim(),
    });
  }
  return result;
}

function parseCsvFunctional(csvText) {
  return csvText
    .split('\n')
    .slice(1) 
    .filter((line) => line.trim() !== '') 
    .map((line) => {
      const [svn_id, real_name, website, project_name] = line.split(',');
      const siteOrNull =
        website && website.trim() !== '' ? website.trim() : null;
      return {
        username: svn_id.trim(),
        realName: real_name.trim(),
        website: siteOrNull,
        projectName: project_name.trim(),
      };
    });
}

function getAllProjects(contributions) {
  return contributions
      .map((c) => c.projectName)
      .filter((p) => p && p.trim() !== '');
}

function getUniqueAndSortedProjects(allProjects) {
  const uniqueProjects = [...new Set(allProjects)];
  uniqueProjects.sort((a, b) => a.localeCompare(b, 'fr', { sensitivity: 'base' }));
  return uniqueProjects;
}

function getFirstProject(uniqueProjects) {
  return uniqueProjects[0] || null;
}

function getUniqueUsernames(contributions) {
  return [...new Set(contributions.map((c) => c.username))];
}

function createUniqueContributionsMap(contributions) {
  const uniqueObjByUsername = {};
  contributions.forEach((c) => {
    uniqueObjByUsername[c.username] = c;
  });
  return uniqueObjByUsername;
}

function calculateAverageNameLength(uniqueContribs) {
  const sumLengths = uniqueContribs.reduce(
      (acc, c) => acc + (c.realName || '').length,
      0
  );
  return uniqueContribs.length > 0 ? sumLengths / uniqueContribs.length : 0;
}

function getContributionsByUser(contributions) {
  const contributionsByUser = {};
  contributions.forEach((c) => {
    if (!contributionsByUser[c.username]) {
      contributionsByUser[c.username] = new Set();
    }
    contributionsByUser[c.username].add(c.projectName);
  });
  return contributionsByUser;
}

function findMostActiveUser(contributionsByUser) {
  let mostActiveUser = null;
  let maxProjectsCount = -1;

  for (const [username, projectsSet] of Object.entries(contributionsByUser)) {
    if (projectsSet.size > maxProjectsCount) {
      mostActiveUser = username;
      maxProjectsCount = projectsSet.size;
    }
  }
  return mostActiveUser;
}

function getContributorsByProject(contributions) {
  const contributorsByProject = {};
  contributions.forEach((c) => {
    if (!contributorsByProject[c.projectName]) {
      contributorsByProject[c.projectName] = new Set();
    }
    contributorsByProject[c.projectName].add(c.username);
  });
  return contributorsByProject;
}

function getTop10Projects(contributorsByProject) {
  const projectCountArray = Object.entries(contributorsByProject).map(
      ([p, userSet]) => ({
        project: p,
        count: userSet.size,
      })
  );

  projectCountArray.sort(
      (a, b) =>
          b.count - a.count || a.project.localeCompare(b.project, 'fr', { sensitivity: 'base' })
  );

  return projectCountArray.slice(0, 10);
}

function analyzeContributions(contributions) {
  const allProjects = getAllProjects(contributions);
  const uniqueProjects = getUniqueAndSortedProjects(allProjects);
  const firstProject = getFirstProject(uniqueProjects);


  const uniqueUsernames = getUniqueUsernames(contributions);
  const nbUniqueContributors = uniqueUsernames.length;

  const uniqueObjByUsername = createUniqueContributionsMap(contributions);
  const uniqueContribs = Object.values(uniqueObjByUsername);
  const avgNameLength = calculateAverageNameLength(uniqueContribs);

  const contributionsByUser = getContributionsByUser(contributions);
  const mostActiveUser = findMostActiveUser(contributionsByUser);
  const mostActiveContributorName = mostActiveUser
      ? uniqueObjByUsername[mostActiveUser].realName
      : null;

  const contributorsByProject = getContributorsByProject(contributions);
  const top10Projects = getTop10Projects(contributorsByProject);

  return {
    firstProject,
    nbUniqueContributors,
    avgNameLength,
    mostActiveContributorName,
    top10Projects,
  };
}


const contributionsMinimal = [
  {
    username: 'johnDoe',
    realName: 'John Doe',
    website: 'http://johndoe.com',
    projectName: 'Apache Foo',
  },
  {
    username: 'jane',
    realName: 'Jane Smith',
    website: null,
    projectName: 'Apache Bar',
  },
];

const contributionsStandard = [
  {
    username: 'johnDoe',
    realName: 'John Doe',
    website: 'http://johndoe.com',
    projectName: 'Apache Foo',
  },
  {
    username: 'jane',
    realName: 'Jane Smith',
    website: null,
    projectName: 'Apache Bar',
  },
  {
    username: 'jane',
    realName: 'Jane Smith',
    website: null,
    projectName: 'Apache Foo',
  },
  {
    username: 'bob',
    realName: 'Bobby Brown',
    website: 'http://bobby.com',
    projectName: 'Zeta Project',
  },
  {
    username: 'JohnDoe',
    realName: 'Johnathan Doe',
    website: 'http://johnathan.com',
    projectName: 'Apache Foo',
  },
  {
    username: 'élo',
    realName: 'Élodie Dupont',
    website: null,
    projectName: 'caffè Latte',
  },
];

function testParseCsvImperative() {
  console.log('--- Test parseCsvImperative ---');
  const csvText = `svn_id,real_name,website,project_name
johnDoe,John Doe,http://johndoe.com,Apache Foo
jane,Jane Smith,,Apache Bar
`;
  const parsed = parseCsvImperative(csvText);
  assertEqual(parsed.length, 2, 'taille du parsing');
  assertEqual(parsed[0].username, 'johnDoe', 'username 1');
  assertEqual(parsed[1].website, null, 'website vide => null');
}

function testParseCsvFunctional() {
  console.log('--- Test parseCsvFunctional ---');
  const csvText = `svn_id,real_name,website,project_name
johnDoe,John Doe,http://johndoe.com,Apache Foo
jane,Jane Smith,,Apache Bar
`;
  const parsedImp = parseCsvImperative(csvText);
  const parsedFunc = parseCsvFunctional(csvText);
  assertDeepEqual(parsedFunc, parsedImp, 'Imp vs Func => même résultat');
}

function testAnalyzeMinimal() {
  console.log('--- Test analyzeContributions (Minimal) ---');
  const stats = analyzeContributions(contributionsMinimal);
  assertEqual(stats.firstProject, 'Apache Bar', 'firstProject minimal');
  assertEqual(stats.nbUniqueContributors, 2, 'nbUniqueContributors minimal');
  assertEqual(Math.round(stats.avgNameLength), 9, 'avgNameLength minimal (arrondi)');
}

function testAnalyzeStandard() {
  console.log('--- Test analyzeContributions (Standard) ---');
  const stats = analyzeContributions(contributionsStandard);
assertEqual(stats.firstProject, 'Apache Bar', 'firstProject standard');
  assertEqual(stats.nbUniqueContributors, 5, 'nbUniqueContributors standard');

  assertCloseTo(stats.avgNameLength, 10.8, 0.0001, 'avgNameLength standard');


  assertEqual(stats.mostActiveContributorName, 'Jane Smith', 'mostActiveContributorName standard');


  assertEqual(stats.top10Projects[0].project, 'Apache Foo', 'top10Projects[0].project');
  assertEqual(stats.top10Projects[0].count, 3, 'top10Projects[0].count');
}


function runAllTests() {
  testParseCsvImperative();
  testParseCsvFunctional();
  testAnalyzeMinimal();
  testAnalyzeStandard();
  console.log('\nTous les tests ont été exécutés.\n');
}

runAllTests();
