defmodule EventAppWeb.CommentView do
  use EventAppWeb, :view
  alias EventAppWeb.CommentView
  alias EventAppWeb.UserView
  alias EventApp.Users

  def render("index.json", %{comments: comments}) do
    %{data: render_many(comments, CommentView, "comment.json")}
  end

  def render("show.json", %{comment: comment}) do
    %{data: render_one(comment, CommentView, "comment.json")}
  end

  def render("comment.json", %{comment: comment}) do
    user = Users.get_user!(comment.user_id)
    %{id: comment.id,
      body: comment.body,
      user_id: comment.user_id,
      user: render_one(user, UserView, "user.json")
    }
  end
end
