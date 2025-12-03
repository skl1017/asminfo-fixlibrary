from fastapi import  status, APIRouter, HTTPException
from app.models.models import CreateIssue, ReadIssue
from app.services.issue import IssueService

router = APIRouter()

@router.post("", status_code=status.HTTP_201_CREATED)
def create_issue(create_issue: CreateIssue):
    try:
        return IssueService.create_issue(create_issue)
    except Exception:
        raise

@router.get("/{issue_id}", status_code=status.HTTP_200_OK, response_model=ReadIssue)
def get_issue(issue_id: int):
    try:
        return IssueService.get_issue(issue_id)
    except Exception:
        raise