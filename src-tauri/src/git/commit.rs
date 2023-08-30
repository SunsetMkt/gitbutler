use super::Result;

pub struct Commit<'repo> {
    commit: git2::Commit<'repo>,
}

impl<'repo> From<git2::Commit<'repo>> for Commit<'repo> {
    fn from(commit: git2::Commit<'repo>) -> Self {
        Self { commit }
    }
}

impl<'repo> From<&'repo git2::Commit<'repo>> for Commit<'repo> {
    fn from(commit: &'repo git2::Commit<'repo>) -> Self {
        Self { commit: commit.clone() }
    }
}

impl<'repo> From<&'repo Commit<'repo>> for &'repo git2::Commit<'repo> {
    fn from(val: &'repo Commit<'repo>) -> Self {
        &val.commit
    }
}

impl<'repo> Commit<'repo> {
    pub fn id(&self) -> git2::Oid {
        self.commit.id()
    }

    pub fn parent_count(&self) -> usize {
        self.commit.parent_count()
    }

    pub fn tree(&self) -> Result<git2::Tree<'repo>> {
        self.commit.tree()
    }

    pub fn tree_id(&self) -> git2::Oid {
        self.commit.tree_id()
    }

    pub fn parent(&self, n: usize) -> Result<Commit<'repo>> {
        self.commit.parent(n).map(Commit::from)
    }

    pub fn time(&self) -> git2::Time {
        self.commit.time()
    }

    pub fn author(&self) -> git2::Signature<'_> {
        self.commit.author()
    }

    pub fn message(&self) -> Option<&str> {
        self.commit.message()
    }

    pub fn committer(&self) -> git2::Signature<'_> {
        self.commit.committer()
    }
}
