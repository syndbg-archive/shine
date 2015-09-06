class AddEmailConstraintToUsers < ActiveRecord::Migration
  def up
    execute <<-SQL
      ALTER TABLE users
      ADD CONSTRAINT email_must_be_company_email
      CHECK ( email ~* '[A-Za-z0-9._%-]+@example.com' )
    SQL
  end

  def down
    execute <<-SQL
      ALTER TABLE users
      DROP CONSTRAINT email_must_be_company_email
    SQL
  end
end
