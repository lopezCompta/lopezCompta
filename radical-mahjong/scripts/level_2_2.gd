extends Area2D

var tuile = preload("res://scenes/tuile2.tscn")

var tile1 = null
var tile2 = null

signal retour
signal relance

var caracteres_du_niveau = ["bamboo", "bleu", "chariot", "cheval", "cochon", "coeur", "coquillage", "couteau", "maladie", "manger", "matin", "oeil", "oiseau", "pasteque", "pluie", "rouge", "travail", "vie", "vieux", "voler"]
var alea = null

func _ready() -> void:
	
	_row_of_tiles(7, 2, 2, 1)
	_row_of_tiles(6, 3, 4, 1)
	_row_of_tiles(5, 4, 6, 1)
	_row_of_tiles(3, 5, 10, 1)
	_row_of_tiles(2, 6, 12, 1)
	_row_of_tiles(2, 7, 12, 1)
	_row_of_tiles(2, 8, 12, 1)
	_row_of_tiles(2, 9, 5, 1)
	_row_of_tiles(3, 10, 3, 1)
	_row_of_tiles(9, 9, 5, 1)
	_row_of_tiles(10, 10, 3, 1)
		
func _row_of_tiles(_posX, _posY, _longueur, _etage):
	if _etage == 1:
		for i in _longueur:
			alea = randi() % caracteres_du_niveau.size()
			_instantiate_tile(f1x(i+_posX), f1y(_posY), caracteres_du_niveau[alea], _etage)
	elif _etage == 2:
		for i in _longueur:
			alea = randi() % caracteres_du_niveau.size()
			_instantiate_tile(f2x(i+_posX), f2y(_posY), caracteres_du_niveau[alea], _etage)
	elif _etage == 3:
		for i in _longueur:
			alea = randi() % caracteres_du_niveau.size()
			_instantiate_tile(f3x(i+_posX), f3y(_posY), caracteres_du_niveau[alea], _etage)
	elif _etage == 4:
		for i in _longueur:
			alea = randi() % caracteres_du_niveau.size()
			_instantiate_tile(f4x(i+_posX), f4y(_posY), caracteres_du_niveau[alea], _etage)
			
func _col_of_tiles(_posX, _posY, _longueur, _etage):
	if _etage == 1:
		for i in _longueur:
			alea = randi() % caracteres_du_niveau.size()
			_instantiate_tile(f1x(_posX), f1y(i+_posY), caracteres_du_niveau[alea], _etage)
	elif _etage == 2:
		for i in _longueur:
			alea = randi() % caracteres_du_niveau.size()
			_instantiate_tile(f2x(_posX), f2y(i+_posY), caracteres_du_niveau[alea], _etage)
	elif _etage == 3:
		for i in _longueur:
			alea = randi() % caracteres_du_niveau.size()
			_instantiate_tile(f3x(_posX), f3y(i+_posY), caracteres_du_niveau[alea], _etage)
	elif _etage == 4:
		for i in _longueur:
			alea = randi() % caracteres_du_niveau.size()
			_instantiate_tile(f4x(_posX), f4y(i+_posY), caracteres_du_niveau[alea], _etage)
		
func _instantiate_tile(_x, _y, _caractere, levelground):
	var t = tuile.instantiate()
	$tile_list.add_child(t)
	t.position = Vector2(_x, _y)
	t.connect("tile_pressed", Callable(self, "_on_tile_pressed"))
	t.connect("tile_pressed", Callable(self, "_on_tile_pressed"))
	t.caractere = _caractere
	t._custom_init()
	if levelground == 1:
		t.get_node("left").set_collision_layer(1)
		t.get_node("left").set_collision_mask(15)
		t.get_node("right").set_collision_layer(1)
		t.get_node("right").set_collision_mask(15)
	elif levelground == 2:
		t.get_node("left").set_collision_layer(2)
		t.get_node("left").set_collision_mask(14)
		t.get_node("right").set_collision_layer(2)
		t.get_node("right").set_collision_mask(14)
	elif levelground == 3:
		t.get_node("left").set_collision_layer(4)
		t.get_node("left").set_collision_mask(12)
		t.get_node("right").set_collision_layer(4)
		t.get_node("right").set_collision_mask(12)
	elif levelground == 4:
		t.get_node("left").set_collision_layer(8)
		t.get_node("left").set_collision_mask(8)
		t.get_node("right").set_collision_layer(8)
		t.get_node("right").set_collision_mask(8)
	t.update_state()
	
func _on_tile_pressed(t):
	# si on n'a pas de sélection, on clique ça sélectionne 
	if tile1 == null:
		tile1 = t
		t.modulate = Color(1, 0.8, 1, 0.8)
		$clickButton.play()
		
	if tile1 != null && t != null && tile1 != t:
		if t.caractere == tile1.caractere:
			$associationSound.play()
			animation_launch()
			tile1.queue_free()
			t.queue_free()
			tile1 = null
			t = null
			for child in $tile_list.get_children():
				child.update_state()
				
		else: 
			tile1.modulate = Color(1, 1, 1, 1)
			tile1 = t
			tile1.modulate = Color(1, 0.8, 1, 0.8)
			$clickButton.play()
		
func _on_texture_button_pressed() -> void:
	
	for child in $tile_list.get_children():
		alea = randi() % caracteres_du_niveau.size()
		child.caractere = caracteres_du_niveau[alea]
		child._shake()
		child._custom_init()
		
	var _a = null # au moins 2 tiles avec le même caractère
	var _b = null
	var available_tiles = []
	for child in $tile_list.get_children():
		if child.available == true:
			available_tiles.append(child)
	alea = randi() % caracteres_du_niveau.size()
	_a = randi() % available_tiles.size()
	_b = _a
	while _b == _a:
		_b = randi() % available_tiles.size()
	available_tiles[_a].caractere = caracteres_du_niveau[alea]
	available_tiles[_b].caractere = caracteres_du_niveau[alea]
	available_tiles[_a]._shake()
	available_tiles[_a]._custom_init()
	available_tiles[_b]._shake()
	available_tiles[_b]._custom_init()
		
func _on_timer_timeout() -> void:
	$animation.visible = false
	if $tile_list.get_child_count() < 2:
		$win_animation.visible = true
		print("win")
	
func animation_launch():
	if tile1.caractere == "cochon":
		$animation/image_caractere.texture = load("res://sprites/caracteres/cochon.png") as Texture2D
		$animation/pinyin.text = "Shi"
		$animation/francais.text = "Cochon"
		$animation/caractere.text = "豕"
	elif tile1.caractere == "oiseau":
		$animation/image_caractere.texture = load("res://sprites/caracteres/oiseau.png") as Texture2D
		$animation/pinyin.text = "Zhui"
		$animation/francais.text = "Oiseau"
		$animation/caractere.text = "隹"
	elif tile1.caractere == "pasteque":
		$animation/image_caractere.texture = load("res://sprites/caracteres/pasteque.png") as Texture2D
		$animation/pinyin.text = "Gua"
		$animation/francais.text = "Pasteque"
		$animation/caractere.text = "瓜"
	elif tile1.caractere == "couteau":
		$animation/image_caractere.texture = load("res://sprites/caracteres/couteau.png") as Texture2D
		$animation/pinyin.text = "Dao"
		$animation/francais.text = "Couteau"
		$animation/caractere.text = "刀"
	elif tile1.caractere == "vie":
		$animation/image_caractere.texture = load("res://sprites/caracteres/vie.png") as Texture2D
		$animation/pinyin.text = "Sheng"
		$animation/francais.text = "Vie"
		$animation/caractere.text = "生"
	elif tile1.caractere == "bamboo":
		$animation/image_caractere.texture = load("res://sprites/caracteres/bamboo.png") as Texture2D
		$animation/pinyin.text = "zhu"
		$animation/francais.text = "bamboo"
		$animation/caractere.text = "竹"
	elif tile1.caractere == "bleu":
		$animation/image_caractere.texture = load("res://sprites/caracteres/bleu.png") as Texture2D
		$animation/pinyin.text = "qing"
		$animation/francais.text = "bleu vert"
		$animation/caractere.text = "青"
	elif tile1.caractere == "chariot":
		$animation/image_caractere.texture = load("res://sprites/caracteres/chariot.png") as Texture2D
		$animation/pinyin.text = "chariot"
		$animation/francais.text = "che"
		$animation/caractere.text = "车"
	elif tile1.caractere == "cheval":
		$animation/image_caractere.texture = load("res://sprites/caracteres/cheval.png") as Texture2D
		$animation/pinyin.text = "ma"
		$animation/francais.text = "cheval"
		$animation/caractere.text = "马"
	elif tile1.caractere == "coeur":
		$animation/image_caractere.texture = load("res://sprites/caracteres/coeur.png") as Texture2D
		$animation/pinyin.text = "xin"
		$animation/francais.text = "coeur"
		$animation/caractere.text = "心"
	elif tile1.caractere == "coquillage":
		$animation/image_caractere.texture = load("res://sprites/caracteres/coquillage.png") as Texture2D
		$animation/pinyin.text = "bei"
		$animation/francais.text = "coquillage"
		$animation/caractere.text = "贝"
	elif tile1.caractere == "maladie":
		$animation/image_caractere.texture = load("res://sprites/caracteres/maladie.png") as Texture2D
		$animation/pinyin.text = "chuang"
		$animation/francais.text = "maladie"
		$animation/caractere.text = "疒"
	elif tile1.caractere == "manger":
		$animation/image_caractere.texture = load("res://sprites/caracteres/manger.png") as Texture2D
		$animation/pinyin.text = "shi"
		$animation/francais.text = "manger"
		$animation/caractere.text = "饣"
	elif tile1.caractere == "matin":
		$animation/image_caractere.texture = load("res://sprites/caracteres/matin.png") as Texture2D
		$animation/pinyin.text = "chen"
		$animation/francais.text = "matin"
		$animation/caractere.text = "辰"
	elif tile1.caractere == "oeil":
		$animation/image_caractere.texture = load("res://sprites/caracteres/oeil.png") as Texture2D
		$animation/pinyin.text = "mu"
		$animation/francais.text = "oeil"
		$animation/caractere.text = "目"
	elif tile1.caractere == "pluie":
		$animation/image_caractere.texture = load("res://sprites/caracteres/pluie.png") as Texture2D
		$animation/pinyin.text = "yu"
		$animation/francais.text = "pluie"
		$animation/caractere.text = "雨"
	elif tile1.caractere == "rouge":
		$animation/image_caractere.texture = load("res://sprites/caracteres/rouge.png") as Texture2D
		$animation/pinyin.text = "chi"
		$animation/francais.text = "rouge"
		$animation/caractere.text = "赤"
	elif tile1.caractere == "travail":
		$animation/image_caractere.texture = load("res://sprites/caracteres/travail.png") as Texture2D
		$animation/pinyin.text = "gong"
		$animation/francais.text = "travail"
		$animation/caractere.text = "工"
	elif tile1.caractere == "voler":
		$animation/image_caractere.texture = load("res://sprites/caracteres/voler.png") as Texture2D
		$animation/pinyin.text = "fei"
		$animation/francais.text = "voler"
		$animation/caractere.text = "飞"
	elif tile1.caractere == "vieux":
		$animation/image_caractere.texture = load("res://sprites/caracteres/voler.png") as Texture2D
		$animation/pinyin.text = "lao"
		$animation/francais.text = "vieux"
		$animation/caractere.text = "老"
		
	$animation.visible = true
	$animation/Timer.start()
	
func f1x(_a):
	return _a * 62
	
func f2x(_a):
	return _a * 62 -7

func f3x(_a):
	return _a * 62 -14
	
func f4x(_a):
	return _a * 62 -21
	
func f4xx(_a):
	return _a * 62 -21 + 31
	
func f1y(_a):
	return _a * 77
	
func f2y(_a):
	return _a * 77-7

func f3y(_a):
	return _a * 77-14
	
func f4y(_a):
	return _a * 77-21
	
func f4yy(_a):
	return _a * 77-21 + 37


func _on_retour_button_pressed() -> void:
	emit_signal("retour")


func _on_nouvelle_partie_button_pressed() -> void:
	emit_signal("relance")


func _on_retour_menu_button_pressed() -> void:
	emit_signal("retour")
