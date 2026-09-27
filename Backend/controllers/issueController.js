const createIssue = (req, res) => {
    res.send("ISSUE CREATED");
}

const updateIssueById = (req, res) => {
    res.send("ISSUE UPDATED");
}

const deleteIssueById = (req, res) => {
    res.send("ISSUE DELETED");
}

const getAllIssues = (req, res) => {
    res.send("ALL ISSUE FETCHED");
}

const getIssueById = (req, res) => {
    res.send("ISSUE FETCHED BY ID");
}

module.exports = {
    createIssue,
    updateIssueById,
    deleteIssueById,
    getAllIssues,
    getIssueById,
}