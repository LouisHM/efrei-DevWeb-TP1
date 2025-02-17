export function getAllProjects(contributions) {
    return contributions
        .map((c) => c.projectName)
        .filter((p) => p && p.trim() !== '');
}

export function getUniqueAndSortedProjects(allProjects) {
    const uniqueProjects = [...new Set(allProjects)];
    uniqueProjects.sort((a, b) => a.localeCompare(b, 'fr', { sensitivity: 'base' }));
    return uniqueProjects;
}

export function getFirstProject(uniqueProjects) {
    return uniqueProjects[0] || null;
}

export function getUniqueUsernames(contributions) {
    return [...new Set(contributions.map((c) => c.realName))];
}

export function createUniqueContributionsMap(contributions) {
    const uniqueObjByUsername = {};
    contributions.forEach((c) => {
        uniqueObjByUsername[c.username] = c;
    });
    return uniqueObjByUsername;
}

export function calculateAverageNameLength(uniqueContribs) {
    const sumLengths = uniqueContribs.reduce(
        (acc, c) => acc + (c.realName || '').length,
        0
    );
    return sumLengths / uniqueContribs.length;
}

export function getContributionsByUser(contributions) {
    const contributionsByUser = {};
    contributions.forEach((c) => {
        if (!contributionsByUser[c.username]) {
            contributionsByUser[c.username] = new Set();
        }
        contributionsByUser[c.username].add(c.projectName);
    });
    return contributionsByUser;
}

export function findMostActiveUser(contributionsByUser) {
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

export function getContributorsByProject(contributions) {
    const contributorsByProject = {};
    contributions.forEach((c) => {
        if (!contributorsByProject[c.projectName]) {
            contributorsByProject[c.projectName] = new Set();
        }
        contributorsByProject[c.projectName].add(c.username);
    });
    return contributorsByProject;
}

export function getTop10Projects(contributorsByProject) {
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

export function analyzeContributions(contributions) {
    const allProjects = getAllProjects(contributions);
    const uniqueProjects = getUniqueAndSortedProjects(allProjects);
    const firstProject = getFirstProject(uniqueProjects);


    const uniqueUsernames = getUniqueUsernames(contributions);
    const nbUniqueContributors = uniqueUsernames.length;

    const uniqueObjByUsername = createUniqueContributionsMap(contributions);
    const uniqueContribs = Object.values(uniqueObjByUsername);
    console.log("unique Contribs ",uniqueContribs)
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


