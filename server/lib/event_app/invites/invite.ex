defmodule EventApp.Invites.Invite do
  use Ecto.Schema
  import Ecto.Changeset

  schema "invites" do
    field :accept, :boolean, default: false
    field :email, :string
    field :url, :string
    belongs_to :event, EventApp.Events.Event
    belongs_to :user, EventApp.Users.User

    timestamps()
  end

  @doc false
  def changeset(invite, attrs) do
    invite
    |> cast(attrs, [:email, :url, :accept, :user_id, :event_id])
    |> validate_required([:email, :url, :accept, :user_id, :event_id])
  end
end
