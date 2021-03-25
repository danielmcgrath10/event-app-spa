# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     EventApp.Repo.insert!(%EventApp.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

defmodule Inject do
  def user(name, pass) do
    hash = Argon2.hash_pwd_salt("pass")
    Repo.insert!(%User{name: name, password_has: hash})
  end
end

alice = Inject.user("alice", "test1")
