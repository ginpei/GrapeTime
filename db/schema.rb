# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160713001123) do

  create_table "tasks", force: :cascade do |t|
    t.string   "name"
    t.integer  "spent_time",     default: 0
    t.integer  "estimate_time",  default: 0
    t.integer  "necessary_time", default: 0
    t.integer  "parent_id"
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
  end

  create_table "work_periods", force: :cascade do |t|
    t.datetime "started_at"
    t.datetime "finished_at"
    t.string   "note"
    t.integer  "task_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "work_periods", ["task_id"], name: "index_work_periods_on_task_id"

end
