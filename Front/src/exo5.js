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

export function getUniqueUserRealName(contributions) {
    return [...new Set(contributions.map((c) => c.realName))];
}

export function createUniqueContributions(contributions) {
    const uniqueContribByRealName = {};
    contributions.forEach((c) => {
        if (c && c.realName) {
            uniqueContribByRealName[c.realName] = c;
        }
    });
    return uniqueContribByRealName;
}

export function calculateAverageNameLength(uniqueContribs) {
    if (!Array.isArray(uniqueContribs) || !uniqueContribs.length) return 0;
    
    let totalLength = 0;
    let validNames = 0;

    for (const contrib of uniqueContribs) {
        if (contrib?.realName) {
            totalLength += contrib.realName.length;
            validNames++;
        }
    }

    return validNames ? totalLength / validNames : 0;
}

export function getContributionsByUser(contributions) {
    const contributionsByRealName = {};
    contributions.forEach((c) => {
        if (c && c.realName) {
            if (!contributionsByRealName[c.realName]) {
                contributionsByRealName[c.realName] = new Array();
            }
            if (c.projectName) {
                contributionsByRealName[c.realName].push(c.projectName);
            }
        }
    });
    return contributionsByRealName;
}

export function findMostActiveUser(contributionsByRealName) {
    let mostActiveUser = null;
    let maxProjectsCount = -1;
    for (const [realName, projects] of Object.entries(contributionsByRealName)) {
        if (projects.length > maxProjectsCount) {
            mostActiveUser = realName;
            maxProjectsCount = projects.length;
        }
    }
    return mostActiveUser;
}

export function getContributorsByProject(contributions) {
    const contributorsByProject = {};
    contributions.forEach((c) => {
        if (c && c.projectName && c.realName) {
            if (!contributorsByProject[c.projectName]) {
                contributorsByProject[c.projectName] = new Set();
            }
            contributorsByProject[c.projectName].add(c.realName);
        }
    });
    return contributorsByProject;
}

export function getTop10Projects(contributorsByProject) {
    const projectCountArray = Object.entries(contributorsByProject).map(
        ([p, contributors]) => ({
            project: p,
            count: contributors.size,
        })
    );

    projectCountArray.sort(
        (a, b) =>
            b.count - a.count || a.project.localeCompare(b.project, 'fr', { sensitivity: 'base' })
    );

    return projectCountArray.slice(0, 10).map((p) => p.project);
}

export function analyzeContributions(contributions) {
    const allProjects = getAllProjects(contributions);
    const uniqueProjects = getUniqueAndSortedProjects(allProjects);
    const firstProject = getFirstProject(uniqueProjects);

    const uniqueRealName = getUniqueUserRealName(contributions);
    const nbUniqueContributors = uniqueRealName.length;

    const uniqueObjByRealName = createUniqueContributions(contributions);
    const uniqueContribs = Object.values(uniqueObjByRealName);
    const avgNameLength = calculateAverageNameLength(uniqueContribs);

    const contributionsByUser = getContributionsByUser(contributions);
    const mostActiveUser = findMostActiveUser(contributionsByUser);
    const mostActiveContributorName = mostActiveUser;

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