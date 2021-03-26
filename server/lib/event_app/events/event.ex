defmodule EventApp.Events.Event do
  use Ecto.Schema
  import Ecto.Changeset

  schema "events" do
    field :body, :string
    field :date, :string
    field :name, :string
    belongs_to :user, EventApp.Users.User

    has_many :comments, EventApp.Comments.Comment
    has_many :invites, EventApp.Invites.Invite

    timestamps()
  end

  @doc false
  def changeset(event, attrs) do
    event
    |> cast(attrs, [:name, :date, :body, :user_id])
    |> validate_required([:name, :date, :body, :user_id])
  end
end
