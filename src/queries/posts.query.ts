import { gql } from '@apollo/client';

export const GET_RESULTS = gql`
  query{
    allResults{
      id
      hours
    }
  }
`;

export const GET_RESULT = gql`
  query Result($projectId:Int!){
    result(projectId:$projectId){
      id
      hour
      roomT
      clodS
      rhexS
      ahexS
      fs
      mrt
    }
  }
`;

export const GET_PROJECTS = gql`
  query{
    allProjects {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;