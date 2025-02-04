export function parseCsvImperative(csvText) {
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

export function parseCsvFunctional(csvText) {
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

