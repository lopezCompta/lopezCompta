extends Area2D #scene qui gere tout 

var tuile = preload("res://scenes/tuile.tscn")

var tileSelected1 = null
var tileMouseIn = null

var caracteres_du_niveau = ["bamboo", "bleu", "chariot", "cheval", "cochon", "coeur", "coquillage", "couteau", "maladie", "manger", "matin", "oeil", "oiseau", "pasteque", "pluie", "rouge", "travail", "vie", "vieux", "voler"]
var alea = null

func _ready() -> void:
	
	for i in 12:
		for j in 6:
			alea = randi() % caracteres_du_niveau.size()
			_instantiate_tile(f1x(i+1), f1y(j+2), caracteres_du_niveau[alea], 1)
	
	for i in 10:
		for j in 4:
			alea = randi() % caracteres_du_niveau.size()
			_instantiate_tile(f2x(i+2), f2y(j+3), caracteres_du_niveau[alea], 2)
			
	for i in 8:
		for j in 2:
			alea = randi() % caracteres_du_niveau.size()
			_instantiate_tile(f3x(i+3), f3y(j+4), caracteres_du_niveau[alea], 3)
			
	for i in 7:
		alea = randi() % caracteres_du_niveau.size()
		_instantiate_tile(f4xx(i+3), f4yy(4), caracteres_du_niveau[alea], 4)
	
func _instantiate_tile(_x, _y, _caractere, levelground):
	var t = tuile.instantiate()
	$tile_list.add_child(t)
	t.position = Vector2(_x, _y)
	t.connect("mouse_entered_available", Callable(self, "_on_mouse_entered_available"))
	t.connect("mouse_exited_available", Callable(self, "_on_mouse_exited_available"))
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
	
func _on_texture_button_pressed() -> void:
	for child in $tile_list.get_children():
		alea = randi() % caracteres_du_niveau.size()
		child.caractere = caracteres_du_niveau[alea]
		child._shake()
		child._custom_init()
		

func _on_input_event(viewport: Node, event: InputEvent, shape_idx: int) -> void:
	if event is InputEventMouseButton and event.button_index == MOUSE_BUTTON_LEFT and event.pressed:
		if tileSelected1 == null && tileMouseIn != null:
			tileSelected1 = tileMouseIn
			tileSelected1.modulate = Color(1, 0.8, 1, 0.8)
			$clickButton.play()
		if tileSelected1 != null && tileMouseIn != null && tileMouseIn != tileSelected1:
			if tileSelected1.caractere == tileMouseIn.caractere:
				$associationSound.play()
				animation_launch()
				tileSelected1.queue_free()
				tileMouseIn.queue_free()
				tileSelected1 = null
				tileMouseIn = null
				for child in $tile_list.get_children():
					child.update_state()
				
			else:
				tileSelected1.modulate = Color(1, 1, 1, 1)
				tileSelected1 = tileMouseIn
				tileSelected1.modulate = Color(1, 0.8, 1, 0.8)
				$clickButton.play()
		
func _on_mouse_entered_available(node):
	tileMouseIn = node
	
func _on_mouse_exited_available(node):
	tileMouseIn = null

func _on_timer_timeout() -> void:
	$animation.visible = false
	
func animation_launch():
	if tileSelected1.caractere == "cochon":
		$animation/image_caractere.texture = load("res://sprites/caracteres/cochon.png") as Texture2D
		$animation/pinyin.text = "Shi"
		$animation/francais.text = "Cochon"
		$animation/caractere.text = "豕"
	elif tileSelected1.caractere == "oiseau":
		$animation/image_caractere.texture = load("res://sprites/caracteres/oiseau.png") as Texture2D
		$animation/pinyin.text = "Zhui"
		$animation/francais.text = "Oiseau"
		$animation/caractere.text = "隹"
	elif tileSelected1.caractere == "pasteque":
		$animation/image_caractere.texture = load("res://sprites/caracteres/pasteque.png") as Texture2D
		$animation/pinyin.text = "Gua"
		$animation/francais.text = "Pasteque"
		$animation/caractere.text = "瓜"
	elif tileSelected1.caractere == "couteau":
		$animation/image_caractere.texture = load("res://sprites/caracteres/couteau.png") as Texture2D
		$animation/pinyin.text = "Dao"
		$animation/francais.text = "Couteau"
		$animation/caractere.text = "刀"
	elif tileSelected1.caractere == "vie":
		$animation/image_caractere.texture = load("res://sprites/caracteres/vie.png") as Texture2D
		$animation/pinyin.text = "Sheng"
		$animation/francais.text = "Vie"
		$animation/caractere.text = "生"
	elif tileSelected1.caractere == "bamboo":
		$animation/image_caractere.texture = load("res://sprites/caracteres/bamboo.png") as Texture2D
		$animation/pinyin.text = "zhu"
		$animation/francais.text = "bamboo"
		$animation/caractere.text = "竹"
	elif tileSelected1.caractere == "bleu":
		$animation/image_caractere.texture = load("res://sprites/caracteres/bleu.png") as Texture2D
		$animation/pinyin.text = "qing"
		$animation/francais.text = "bleu vert"
		$animation/caractere.text = "青"
	elif tileSelected1.caractere == "chariot":
		$animation/image_caractere.texture = load("res://sprites/caracteres/chariot.png") as Texture2D
		$animation/pinyin.text = "chariot"
		$animation/francais.text = "che"
		$animation/caractere.text = "车"
	elif tileSelected1.caractere == "cheval":
		$animation/image_caractere.texture = load("res://sprites/caracteres/cheval.png") as Texture2D
		$animation/pinyin.text = "ma"
		$animation/francais.text = "cheval"
		$animation/caractere.text = "马"
	elif tileSelected1.caractere == "coeur":
		$animation/image_caractere.texture = load("res://sprites/caracteres/coeur.png") as Texture2D
		$animation/pinyin.text = "xin"
		$animation/francais.text = "coeur"
		$animation/caractere.text = "心"
	elif tileSelected1.caractere == "coquillage":
		$animation/image_caractere.texture = load("res://sprites/caracteres/coquillage.png") as Texture2D
		$animation/pinyin.text = "bei"
		$animation/francais.text = "coquillage"
		$animation/caractere.text = "贝"
	elif tileSelected1.caractere == "maladie":
		$animation/image_caractere.texture = load("res://sprites/caracteres/maladie.png") as Texture2D
		$animation/pinyin.text = "chuang"
		$animation/francais.text = "maladie"
		$animation/caractere.text = "疒"
	elif tileSelected1.caractere == "manger":
		$animation/image_caractere.texture = load("res://sprites/caracteres/manger.png") as Texture2D
		$animation/pinyin.text = "shi"
		$animation/francais.text = "manger"
		$animation/caractere.text = "饣"
	elif tileSelected1.caractere == "matin":
		$animation/image_caractere.texture = load("res://sprites/caracteres/matin.png") as Texture2D
		$animation/pinyin.text = "chen"
		$animation/francais.text = "matin"
		$animation/caractere.text = "辰"
	elif tileSelected1.caractere == "oeil":
		$animation/image_caractere.texture = load("res://sprites/caracteres/oeil.png") as Texture2D
		$animation/pinyin.text = "mu"
		$animation/francais.text = "oeil"
		$animation/caractere.text = "目"
	elif tileSelected1.caractere == "pluie":
		$animation/image_caractere.texture = load("res://sprites/caracteres/pluie.png") as Texture2D
		$animation/pinyin.text = "yu"
		$animation/francais.text = "pluie"
		$animation/caractere.text = "雨"
	elif tileSelected1.caractere == "rouge":
		$animation/image_caractere.texture = load("res://sprites/caracteres/rouge.png") as Texture2D
		$animation/pinyin.text = "chi"
		$animation/francais.text = "rouge"
		$animation/caractere.text = "赤"
	elif tileSelected1.caractere == "travail":
		$animation/image_caractere.texture = load("res://sprites/caracteres/travail.png") as Texture2D
		$animation/pinyin.text = "gong"
		$animation/francais.text = "travail"
		$animation/caractere.text = "工"
	elif tileSelected1.caractere == "voler":
		$animation/image_caractere.texture = load("res://sprites/caracteres/voler.png") as Texture2D
		$animation/pinyin.text = "fei"
		$animation/francais.text = "voler"
		$animation/caractere.text = "飞"
	elif tileSelected1.caractere == "vieux":
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
