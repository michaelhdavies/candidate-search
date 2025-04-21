import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';

interface Candidate {
  name?: string,
  login?: string,
  location?: string,
  email?: string,
  html_url?: string,
  organizations_url?: string,
  avatar_url?: string,
};

const CandidateSearch = () => {
  const [candidateIndex, setCandidateIndex] = useState<number>(0);
  const [currentCandidate, setCurrentCandidate] = useState<Candidate>({});
  const [searchData, setSearchData] = useState<any[]>([])

  useEffect(() => {
    async function searchGithubUsers() {
      const data = await searchGithub();
      console.log(data);
      setSearchData(data);
    }
    searchGithubUsers();
  }, [])

  useEffect(() => {
    setCurrentCandidate(searchData[candidateIndex]);
  }, [searchData, candidateIndex]);

  function nextCandidate() {
    setCandidateIndex(candidateIndex+1);
  }

  function handleAddCandidate() {
    const savedCandidates = JSON.parse(localStorage.getItem("candidates") as string) || [];
    savedCandidates.push(currentCandidate);
    localStorage.setItem("candidates", JSON.stringify(savedCandidates));
    nextCandidate();
  }

  function handleSkipCandidate() {
    nextCandidate();
  }

  return (
    <div className="candidateCard">
      {currentCandidate?.avatar_url ? <img src={currentCandidate.avatar_url} /> : <p>No Avatar Photo Found</p>}
      <p>{currentCandidate?.name ? `Name: ${currentCandidate.name}` : "No Name Found"}</p>
      <p>{currentCandidate?.login ? `Username: ${currentCandidate.login}` : "No Username Found"}</p>
      <p>{currentCandidate?.location ? `Location: ${currentCandidate.location}` : "No Location Found"}</p>
      <p>{currentCandidate?.email ? `Email: ${currentCandidate.email}` : "No Email Found"}</p>
      <p>{currentCandidate?.html_url ? <a href={currentCandidate.html_url} target="_blank">HTML URL</a> : "No HTML URL Found"}</p>
      <p>{currentCandidate?.organizations_url ? <a href={currentCandidate.organizations_url} target="_blank">Company URL</a> : "No Company Found"}</p>
      <div>
        <button onClick={handleSkipCandidate}>-</button>
        <button onClick={handleAddCandidate}>+</button>
      </div>
    </div>
  )
};

export default CandidateSearch;
