# # Script for populating the database. You can run it as:
# #
# #     mix run priv/repo/seeds.exs
# #
# # Inside the script, you can read and write to any of your
# # repositories directly:
# #
# #     EventApp.Repo.insert!(%EventApp.SomeSchema{})
# #
# # We recommend using the bang functions (`insert!`, `update!`
# # and so on) as they will fail if something goes wrong.
# alias EventApp.Repo
# alias EventApp.Users.User
# alias EventApp.Events.Event


# defmodule Inject do
#   def user(name, email, pass) do
#     hash = Argon2.hash_pwd_salt(pass)
#     Repo.insert!(%User{name: name, email: email, password_hash: hash})
#   end
# end

# alice = Inject.user("alice", "alice@alice.com", "test1")
# IO.inspect alice.id


# Repo.insert!(%Event{user_id: alice.id, name: "Super Bash", date: "", body: "This is a sick message"})
# # Repo.insert!(%Event{user_id: bob.id, name: "Secret Stuff", date: "", body: "This is also a sick message"})
