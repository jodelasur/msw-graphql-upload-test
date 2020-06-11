import React from 'react';
import './App.css';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/react-hooks';

export const BUILD = gql`
  query Build($id: ID) {
    build(id: $id) {
      id
      fileSet
    }
  }
`;

export const SET_BUILD_FILE = gql`
  mutation SetBuildFile($id: ID, $file: Upload) {
    SetBuildFile(id: $id, file: $file) {
      build {
        id
        fileSet
      }
    }
  }
`;

function App() {
  const {
    loading: queryLoading,
    error: queryError,
    data: queryData,
  } = useQuery(BUILD, { variables: { id: 1 } });
  const [
    setBuildReferenceFile,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(SET_BUILD_FILE);
  
  if (queryLoading) return <p>Loading...</p>;
  if (queryError) return <p>Error loading query</p>;
  
  const { id, fileSet } = queryData.build;
  if (fileSet) return <p>Build file has been set</p>;
  
  if (mutationLoading) return <p>File upload loading...</p>;
  
  const handleChange = event => setBuildReferenceFile({
    variables: {
      id,
      // Comment this out to pass the test
      file: event.target.files[0],
    },
  });
  
  return (
    <>
      <label htmlFor="dataset-upload">Upload file: </label>
      <input id="dataset-upload" type="file" onChange={handleChange} />
      {mutationError && <p>Error setting file.</p>}
    </>
  );
}

export default App;
