from scope.domain.gates import (
    MIN_ASSIGNMENTS_FOR_RUNWAY,
    MIN_ASSIGNMENTS_FOR_WORKLOAD,
    MIN_COURSES_FOR_RUNWAY,
    MIN_COURSES_FOR_WORKLOAD,
    MIN_WEEKS_FOR_RUNWAY,
    MIN_WEEKS_FOR_WORKLOAD,
)


def test_min_assignments_for_workload():
    assert MIN_ASSIGNMENTS_FOR_WORKLOAD == 12


def test_min_courses_for_workload():
    assert MIN_COURSES_FOR_WORKLOAD == 1


def test_min_weeks_for_workload():
    assert MIN_WEEKS_FOR_WORKLOAD == 3


def test_min_assignments_for_runway():
    assert MIN_ASSIGNMENTS_FOR_RUNWAY == 20


def test_min_courses_for_runway():
    assert MIN_COURSES_FOR_RUNWAY == 2


def test_min_weeks_for_runway():
    assert MIN_WEEKS_FOR_RUNWAY == 6
