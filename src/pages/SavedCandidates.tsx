import { useState, useEffect } from 'react';

interface Candidate {
  name?: string,
  login?: string,
  location?: string,
  email?: string,
  html_url?: string,
  organizations_url?: string,
  avatar_url?: string,
};



const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const storageLoad = JSON.parse(localStorage.getItem("candidates") as string);
    if (storageLoad) {
      setSavedCandidates(storageLoad);
    };
  }, []);




  return (
    <div>
      {savedCandidates.length > 0 ?
        <table className="table">
          <thead>
            <tr>
              <th>
                Image
              </th>
              <th>
                Username
              </th>
              <th>
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            {
              savedCandidates.map((candidate) => {
                return (
                  <tr key={candidate?.login}>
                    <td>
                      <img src={candidate?.avatar_url}/>
                    </td>
                    <td>
                      {candidate?.login}
                    </td>
                    <td>
                      {candidate?.email ? candidate.email : "No Email Available"}
                    </td>

                  </tr>
                )
              })
            }
          </tbody>
        </table>
        :
        <h2>No saved candidates found.</h2>
      }
    </div>
  );
};

export default SavedCandidates;
