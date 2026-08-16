from dataclasses import dataclass
from datetime import date
from uuid import UUID


@dataclass
class Term:
    id: UUID
    name: str
    start_date: date
    end_date: date


@dataclass
class Course:
    id: UUID
    term_id: UUID
    name: str
    description: str


@dataclass
class Assignment:
    id: UUID
    course_id: UUID
    title: str
    due_date: date
    magnitude: int


@dataclass
class WeekLoad:
    id: UUID
    term_id: UUID
    week_start: date
    total_magnitude: int


@dataclass
class Collision:
    id: UUID
    assignment_id: UUID
    collision_type: str
    description: str
