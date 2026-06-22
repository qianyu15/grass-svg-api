import fetch from "node-fetch";

export async function getGrassData(username, year) {
  const query = `
  query {
    user(login: "${username}") {
      contributionsCollection(from: "${year}-01-01T00:00:00Z", to: "${year}-12-31T23:59:59Z") {
        contributionCalendar {
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }`;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
    },
    body: JSON.stringify({ query })
  });

  const json = await res.json();

  const weeks =
    json.data.user.contributionsCollection.contributionCalendar.weeks;

  return weeks.map(w =>
    w.contributionDays.map(d => d.contributionCount)
  );
}
