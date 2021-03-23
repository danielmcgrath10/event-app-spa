defmodule EventApp.Users.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :email, :string
    field :name, :string
    field :password_hash, :string
    field :profile_photo, :string

    has_many :events, EventApp.Events.Event
    has_many :comments, EventApp.Comments.Comment
    has_many :invites, EventApp.Invites.Invite

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:name, :email, :password_hash, :profile_photo])
    |> validate_required([:name, :email, :password_hash, :profile_photo])
  end
end
