@echo off
setlocal enabledelayedexpansion

REM Current worktree path
set CURRENT_WKT=C:\Users\Lenovo\Downloads\blog-api.worktrees\agents-front-end-integration-fixes
REM Main worktree (repo root)
set MAIN_WKT=C:\Users\Lenovo\Downloads\blog-api

echo ====== COMMIT PHASE ======
cd /d "%CURRENT_WKT%"

echo Current branch:
git rev-parse --abbrev-ref HEAD

echo.
echo Checking for uncommitted changes:
git status --porcelain
if %ERRORLEVEL% EQU 0 (
    echo.
    echo Staging all changes...
    git add -A
    
    echo.
    echo Creating commit...
    git commit -m "Fix front-end integration issues" -m "- Add axios to frontend dependencies" -m "- Implement API service methods" -m "- Create UserContext for global state" -m "- Integrate routing with auth" -m "- Fix component imports and props" -m "- Update CSS import paths" -m "" -m "Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
    
    if !ERRORLEVEL! EQU 0 (
        echo Commit successful!
        git log --oneline -1
    ) else (
        echo Commit failed or nothing to commit
    )
) else (
    echo Error checking status
)

echo.
echo ====== MERGE PHASE ======
echo.
echo Merging !CURRENT_WKT! into main...
cd /d "%MAIN_WKT%"

git merge agents/front-end-integration-fixes

if %ERRORLEVEL% EQU 0 (
    echo.
    echo Merge successful!
    git log --oneline -1
    echo.
    echo Final status:
    git status
) else (
    echo.
    echo Merge encountered conflicts or errors
    git status
)

pause
