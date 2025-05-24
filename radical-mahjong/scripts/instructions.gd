extends Node2D

signal instruction_retour

func _on_retour_pressed() -> void:
	emit_signal("instruction_retour")
