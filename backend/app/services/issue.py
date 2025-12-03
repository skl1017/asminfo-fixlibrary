from app.models.models import CreateIssue
from app.orm.models import Issue
from sqlmodel import Session, select
from sqlalchemy.orm import selectinload
from fastapi import HTTPException
from app.core.config import engine

class IssueService():
    @staticmethod
    def create_issue(create_issue: CreateIssue):
        try:
            with Session(engine) as session:
                issue = Issue(**create_issue.model_dump())
                session.add(issue)
                session.commit()
                session.refresh(issue)
                return issue
        except Exception:
            raise
    
    @staticmethod
    def get_issue(issue_id: int):
        try:
            with Session(engine) as session:
                statement = (
                    select(Issue)
                    .where(Issue.id == issue_id)
                    .options(
                        selectinload(Issue.component),
                        selectinload(Issue.diagnostic),
                        selectinload(Issue.solutions),))
                device_record = session.exec(statement).first()
                if device_record is None:
                    raise HTTPException(status_code=404, detail="Issue not found")
                return device_record      
        except Exception:
            raise
