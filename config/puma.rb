workers = (ENV['WEB_CONCURRENCY'] || 2).to_i
threads_count = Integer(ENV['MAX_THREADS'] || 5).to_i

# min at least 2 threads; max at least 5 threads
threads workers, threads_count

preload_app!

rackup DefaultRackup
port ENV['PORT'] || 3000
environment ENV['RACK_ENV'] || 'development'

on_worker_boot do
  ActiveRecord::Base.establish_connection
end
