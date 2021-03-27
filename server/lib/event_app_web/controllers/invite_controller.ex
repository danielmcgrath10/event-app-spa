defmodule EventAppWeb.InviteController do
  use EventAppWeb, :controller

  alias EventApp.Invites
  alias EventApp.Invites.Invite

  action_fallback EventAppWeb.FallbackController

  def index(conn, _params) do
    invites = Invites.list_invites()
    render(conn, "index.json", invites: invites)
  end

  def create(conn, %{"invite" => invite_params, "session" => session}) do
    invite_params=invite_params
    |> Map.put(
      "url",
      "http://events-spa.danny-mcgrath.com/events/#{invite_params["event_id"]}"
    )

    with {:ok, %Invite{} = invite} <- Invites.create_invite(invite_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.invite_path(conn, :show, invite))
      |> render("show.json", invite: invite)
    end
  end

  def show(conn, %{"id" => id}) do
    invite = Invites.get_invite!(id)
    render(conn, "show.json", invite: invite)
  end

  def update(conn, %{"id" => id, "invite" => invite_params}) do
    invite = Invites.get_invite!(id)

    with {:ok, %Invite{} = invite} <- Invites.update_invite(invite, invite_params) do
      render(conn, "show.json", invite: invite)
    end
  end

  def update(conn, %{"id" => id, "accept" => accept}) do
    invite = Invites.get_invite!(id)
    invite_params = %{
      accept: accept,
      url: invite.url,
      email: invite.email,
      event_id: invite.event_id,
      user_id: invite.user_id
    }
    with {:ok, %Invite{} = invite} <- Invites.update_invite(invite, invite_params) do
      render(conn, "show.json", invite: invite)
    end
  end

  def delete(conn, %{"id" => id}) do
    invite = Invites.get_invite!(id)

    with {:ok, %Invite{}} <- Invites.delete_invite(invite) do
      send_resp(conn, :no_content, "")
    end
  end
end
