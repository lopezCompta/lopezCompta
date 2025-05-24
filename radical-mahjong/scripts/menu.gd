extends Node2D

signal play_clicked()
signal instructions_clicked()

func _on_jouer_button_pressed() -> void:
	emit_signal("play_clicked")

func _on_insctructions_button_pressed() -> void:
	emit_signal("instructions_clicked")


func _on_quitter_button_pressed() -> void:
	get_tree().quit()
