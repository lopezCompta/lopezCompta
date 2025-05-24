extends Node2D

var left = false
var right = false
var available = false
var caractere = null

signal tile_pressed(node: Node2D)

func _custom_init():
	if caractere == "cochon":
		$black_text.text = "豕"
	elif caractere == "pasteque":
		$red_text.text = "瓜"
	elif caractere == "oiseau":
		$blue_text.text = "隹"
	elif caractere == "vie":
		$black_text.text = "生"
	elif caractere == "bamboo":
		$blue_text.text = "竹"
	elif caractere == "bleu":
		$red_text.text = "青"
	elif caractere == "chariot":
		$blue_text.text = "车"
	elif caractere == "cheval":
		$black_text.text = "马"
	elif caractere == "coeur":
		$black_text.text = "心"
	elif caractere == "coquillage":
		$red_text.text = "贝"
	elif caractere == "maladie":
		$blue_text.text = "疒"
	elif caractere == "manger":
		$red_text.text = "饣"
	elif caractere == "matin":
		$blue_text.text = "辰"
	elif caractere == "oeil":
		$red_text.text = "目"
	elif caractere == "pluie":
		$black_text.text = "雨"
	elif caractere == "rouge":
		$blue_text.text = "赤"
	elif caractere == "travail":
		$red_text.text = "工"
	elif caractere == "vieux":
		$blue_text.text = "老"
	elif caractere == "voler":
		$red_text.text = "飞"
	elif caractere == "couteau":
		$red_text.text = "刀"
		
func _shake():
	$black_text.text = ""
	$red_text.text = ""
	$blue_text.text = ""
	
func update_state():
	# Réinitialise les états de collision
	left = false
	right = false
	# Vérifie les zones qui se chevauchent pour 'left'
	if $left.get_overlapping_areas().size() > 0:
		left = true
	# Vérifie les zones qui se chevauchent pour 'right'
	if $right.get_overlapping_areas().size() > 0:
		right = true
	if left == true && right == true:
		$Sprite2D.modulate = Color(0.5, 0.5, 0.5)
		available = false
	else:
		$Sprite2D.modulate = Color(1, 1, 1)
		available = true

func _on_hit_box_pressed() -> void:
	emit_signal("tile_pressed", self)
	
func _on_left_area_shape_exited(area_rid: RID, area: Area2D, area_shape_index: int, local_shape_index: int) -> void:
	left = false
	update_state()

func _on_right_area_shape_exited(area_rid: RID, area: Area2D, area_shape_index: int, local_shape_index: int) -> void:
	right = false
	update_state()
	
func _on_left_area_shape_entered(area_rid: RID, area: Area2D, area_shape_index: int, local_shape_index: int) -> void:
	left = true
	update_state()

func _on_right_area_shape_entered(area_rid: RID, area: Area2D, area_shape_index: int, local_shape_index: int) -> void:
	right = true
	update_state()
