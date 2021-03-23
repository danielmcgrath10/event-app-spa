defmodule EventApp.Repo.Migrations.CreateComments do
  use Ecto.Migration

  def change do
    create table(:comments) do
      add :body, :text, null: false
      add :user_id, references(:user, on_delete: :nothing), null: false
      add :event_id, references(:event, on_delete: :nothing), null: false

      timestamps()
    end

    create index(:comments, [:user_id])
    create index(:comments, [:event_id])
  end
end
