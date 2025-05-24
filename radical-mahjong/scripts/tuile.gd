extends Node2D

var left = false
var right = false
var available = false
var caractere = null

signal tile_pressed(node: Node2D)

func _custom_init():
	if caractere == "cochon":
		$blue_text.text = "豕"
	elif caractere == "pasteque":
		$blue_text.text = "瓜"
	elif caractere == "oiseau":
		$blue_text.text = "隹"
	elif caractere == "vie":
		$blue_text.text = "生"
	elif caractere == "bamboo":
		$blue_text.text = "竹"
	elif caractere == "bleu":
		$blue_text.text = "青"
	elif caractere == "chariot":
		$blue_text.text = "车"
	elif caractere == "cheval":
		$blue_text.text = "马"
	elif caractere == "coeur":
		$red_text.text = "心"
	elif caractere == "coquillage":
		$red_text.text = "贝"
	elif caractere == "maladie":
		$red_text.text = "疒"
	elif caractere == "manger":
		$red_text.text = "饣"
	elif caractere == "matin":
		$red_text.text = "辰"
	elif caractere == "oeil":
		$red_text.text = "目"
	elif caractere == "pluie":
		$red_text.text = "雨"
	elif caractere == "rouge":
		$red_text.text = "赤"
	elif caractere == "travail":
		$red_text.text = "工"
	elif caractere == "vieux":
		$black_text.text = "老"
	elif caractere == "voler":
		$black_text.text = "飞"
	elif caractere == "couteau":
		$black_text.text = "刀"
	elif caractere == "chanvre":
		$black_text.text = "麻"
	elif caractere == "cerf":
		$black_text.text = "鹿"
	elif caractere == "dragon":
		$black_text.text = "龙"
	elif caractere == "souris":
		$purple_text.text = "鼡"
	elif caractere == "grenouille":
		$purple_text.text = "黾"
	elif caractere == "tortue":
		$purple_text.text = "龟"
	elif caractere == "tripode":
		$purple_text.text = "鼎"
	elif caractere == "nez":
		$purple_text.text = "鼻"
	elif caractere == "jaune":
		$purple_text.text = "黃"
	elif caractere == "noir":
		$black_text.text = "黑"
	elif caractere == "flute":
		$green_text.text = "龠"
	elif caractere == "tambour":
		$green_text.text = "鼓"
	elif caractere == "blé":
		$green_text.text = "麦"  
	elif caractere == "broderie":
		$green_text.text = "黹"  
	elif caractere == "dent":
		$green_text.text = "齿"  
	elif caractere == "sel":
		$green_text.text = "鹵" 
	elif caractere == "tuile":
		$green_text.text = "瓦" 
	elif caractere == "oiseau2":
		$green_text.text = "鸟"  
	
		
func _shake():
	$black_text.text = ""
	$red_text.text = ""
	$blue_text.text = ""
	$purple_text.text = ""
	$green_text.text = ""
	
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
	if available == true:
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
