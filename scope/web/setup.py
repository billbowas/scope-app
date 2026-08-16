from zoneinfo import available_timezones

from flask import Blueprint, flash, redirect, render_template, request, url_for

from scope.adapters.supabase_client import get_anon_client
from scope.web.security import current_user_id, require_auth

setup_bp = Blueprint("setup", __name__, url_prefix="/setup", template_folder="templates")


@setup_bp.route("/welcome", methods=["GET"])
@require_auth
def welcome():
    """Render welcome step (name + timezone)."""
    timezones = sorted(available_timezones())
    return render_template("setup/welcome.html", timezones=timezones)


@setup_bp.route("/welcome", methods=["POST"])
@require_auth
def welcome_post():
    """Save name and timezone to profile."""
    user_id = current_user_id()
    display_name = request.form.get("display_name", "").strip()
    timezone = request.form.get("timezone", "America/New_York").strip()

    client = get_anon_client()
    client.table("profiles").update({
        "display_name": display_name,
        "timezone": timezone,
    }).eq("id", user_id).execute()

    return redirect(url_for("setup.term"))


@setup_bp.route("/term", methods=["GET"])
@require_auth
def term():
    """Render term creation step."""
    return render_template("setup/term.html")


@setup_bp.route("/term", methods=["POST"])
@require_auth
def term_post():
    """Skeleton: just flash and move on."""
    term_name = request.form.get("term_name", "").strip()
    flash(f"Would create term: {term_name}")
    return redirect(url_for("setup.course"))


@setup_bp.route("/course", methods=["GET"])
@require_auth
def course():
    """Render course creation step."""
    return render_template("setup/course.html")


@setup_bp.route("/course", methods=["POST"])
@require_auth
def course_post():
    """Skeleton: just flash and move on."""
    course_name = request.form.get("course_name", "").strip()
    flash(f"Would create course: {course_name}")
    return redirect(url_for("setup.upload"))


@setup_bp.route("/upload", methods=["GET"])
@require_auth
def upload():
    """Render syllabus upload step."""
    return render_template("setup/upload.html")


@setup_bp.route("/upload", methods=["POST"])
@require_auth
def upload_post():
    """Skeleton: just redirect to today."""
    return redirect(url_for("today"))
