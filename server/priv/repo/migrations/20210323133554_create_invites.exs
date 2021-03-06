defmodule EventApp.Repo.Migrations.CreateInvites do
  use Ecto.Migration

  def change do
    create table(:invites) do
      add :email, :string, null: false
      add :url, :string, null: false
      add :accept, :boolean, default: false, null: false, null: false
      add :event_id, references(:events, on_delete: :nothing), null: false
      add :user_id, references(:users, on_delete: :nothing), null: false

      timestamps()
    end

    create index(:invites, [:event_id])
    create index(:invites, [:user_id])
  end
end
