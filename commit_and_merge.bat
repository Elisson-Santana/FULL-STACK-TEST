@echo off
cd /d "C:\Users\Lenovo\Downloads\blog-api.worktrees\agents-front-end-integration-fixes"

echo Current branch:
git rev-parse --abbrev-ref HEAD

echo.
echo Git status:
git status --short

echo.
echo Staging all changes...
git add -A

echo.
echo Creating commit...
git commit -m "Fix front-end integration issues

- Add axios to frontend dependencies
- Implement API service methods (listPosts, searchPosts, createPost, updatePost, deletePost)
- Create UserContext for global user state management
- Integrate routing with authentication and user context
- Fix component imports and prop passing
- Correct PostCard, PostModal, and other component signatures
- Update CSS import paths

Co-authored-by: Copilot ^<223556219+Copilot@users.noreply.github.com^>"

echo.
echo Commit complete. Status:
git status --short
git log --oneline -1
