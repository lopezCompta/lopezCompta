extends Node2D

var menu = preload("res://scenes/menu.tscn")
var level = preload("res://scenes/level.tscn")
var instruction = preload("res://scenes/instructions.tscn")

func _ready() -> void:
	var m = menu.instantiate()
	self.add_child(m)
	m.connect("play_clicked", Callable(self, "_on_play_clicked"))
	m.connect("instructions_clicked", Callable(self, "_on_instructions_clicked"))
	
func _on_play_clicked():
	get_child(0).queue_free()
	var level = level.instantiate()
	self.add_child(level)
	level.connect("retour", Callable(self, "_on_retour"))
	level.connect("relance", Callable(self, "_on_relance"))
	
func _on_instructions_clicked():
	get_child(0).queue_free()
	var instruction = instruction.instantiate()
	self.add_child(instruction)
	instruction.connect("instruction_retour", Callable(self, "_on_instruction_retour"))
	
func _on_retour():
	get_child(0).queue_free()
	var m = menu.instantiate()
	self.add_child(m)
	m.connect("play_clicked", Callable(self, "_on_play_clicked"))
	m.connect("instructions_clicked", Callable(self, "_on_instructions_clicked"))
	
func _on_relance():
	get_child(0).queue_free()
	var level = level.instantiate()
	self.add_child(level)
	level.connect("retour", Callable(self, "_on_retour"))
	level.connect("relance", Callable(self, "_on_relance"))
		
func _on_instruction_retour():
	get_child(0).queue_free()
	var m = menu.instantiate()
	self.add_child(m)
	m.connect("play_clicked", Callable(self, "_on_play_clicked"))
	m.connect("instructions_clicked", Callable(self, "_on_instructions_clicked"))
