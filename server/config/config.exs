# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :event_app,
  ecto_repos: [EventApp.Repo]

# Configures the endpoint
config :event_app, EventAppWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "lkdKUJ7utAFwtmdZ9wu99Btl56crkcCb8nGponJqHFjv3NKCWCBKomGtjrQuDRfH",
  render_errors: [view: EventAppWeb.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: EventApp.PubSub,
  live_view: [signing_salt: "1ERXhjpq"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
