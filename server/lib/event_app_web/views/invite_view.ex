defmodule EventAppWeb.InviteView do
  use EventAppWeb, :view
  alias EventAppWeb.InviteView

  def render("index.json", %{invites: invites}) do
    %{data: render_many(invites, InviteView, "invite.json")}
  end

  def render("show.json", %{invite: invite}) do
    %{data: render_one(invite, InviteView, "invite.json")}
  end

  def render("invite.json", %{invite: invite}) do
    %{id: invite.id,
      email: invite.email,
      url: invite.url,
      accept: invite.accept}
  end
end
