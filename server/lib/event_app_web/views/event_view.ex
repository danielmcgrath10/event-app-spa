defmodule EventAppWeb.EventView do
  use EventAppWeb, :view
  alias EventAppWeb.EventView
  alias EventAppWeb.UserView
  alias EventAppWeb.CommentView
  alias EventAppWeb.InviteView

  def render("index.json", %{events: events}) do
    %{data: render_many(events, EventView, "event.json")}
  end

  def render("show.json", %{event: event}) do
    %{data: render_one(event, EventView, "event.json")}
  end

  def render("event.json", %{event: event}) do
    %{id: event.id,
      name: event.name,
      date: event.date,
      body: event.body,
      user: render_one(event.user, UserView, "user.json"),
      comments: render_many(event.comments, CommentView, "comment.json"),
      invites: render_many(event.invites, InviteView, "invite.json")
    }
  end
end
