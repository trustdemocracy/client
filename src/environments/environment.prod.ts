
const usersApiBase = "http://api.trustdemocracy.eu/v1/users";
const proposalsApiBase = "http://api.trustdemocracy.eu/v1/proposals";
const socialApiBase = "http://api.trustdemocracy.eu/v1/social";
const votesApiBase = "http://api.trustdemocracy.eu/v1/votes";

export const environment = {
  production: true,
  usersApi: {
    getToken: usersApiBase + "/token",
    refreshToken: usersApiBase + "/token/refresh",

    findAll: usersApiBase + "/users",
    createUser: usersApiBase + "/users",
    findUser: usersApiBase + "/users/:userId",
    updateUser: usersApiBase + "/users/:userId",
    deleteUser: usersApiBase + "/users/:userId"
  },
  proposalsApi: {
    createProposal: proposalsApiBase + "/proposals",
    getProposal: proposalsApiBase + "/proposals/:proposalId",
    getProposals: proposalsApiBase + "/proposals/",
    getProposalsByAuthor: proposalsApiBase + "/proposals?authorId=:authorId",
    deleteProposal: proposalsApiBase + "/proposals/:proposalId",
    publishProposal: proposalsApiBase + "/proposals/:proposalId/publish",
    unpublishProposal: proposalsApiBase + "/proposals/:proposalId/unpublish",

    createComment: proposalsApiBase + "/proposals/:proposalId/comments",
    getComments: proposalsApiBase + "/proposals/:proposalId/comments",
    deleteComment: proposalsApiBase + "/proposals/:proposalId/comments/:commentId",
    voteComment: proposalsApiBase + "/proposals/:proposalId/comments/:commentId",
  },
  socialApi: {
    getEvents: socialApiBase + "/events",
    getEventsByUser: socialApiBase + "/events/:userId",

    followUser: socialApiBase + "/follow",
    unFollow: socialApiBase + "/follow/unfollow",
    acceptFollow: socialApiBase + "/follow/accept",
    cancelFollow: socialApiBase + "/follow/cancel",
    getFollowRequests: socialApiBase + "/follow/requests",

    trustUser: socialApiBase + "/trust",
    unTrust: socialApiBase + "/trust/untrust",
    acceptTrust: socialApiBase + "/trust/accept",
    cancelTrust: socialApiBase + "/trust/cancel",
    getTrustRequests: socialApiBase + "/trust/requests",

    getRelationshipsWithUser: socialApiBase + "/relationships"
  },
  votesApi: {
    voteProposal: votesApiBase + "/votes/:proposalId",
    getVote: votesApiBase + "/votes/:proposalId"
  }
};
