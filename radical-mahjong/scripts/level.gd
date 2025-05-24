extends Area2D

var tuile = preload("res://scenes/tuile.tscn")

var tile1 = null
var tile2 = null

signal retour
signal relance

var caracteres_du_niveau = ["bamboo", "bleu", "blé", "broderie", "cerf", "chanvre", "chariot", "cheval", 
"cochon", "coeur", "coquillage", "couteau", "dent", "dragon", "flute", "grenouille", "jaune", "maladie", 
"manger", "matin", "nez", "noir", "oeil", "oiseau", "oiseau2", "pasteque", "pluie", "rouge", "sel", "souris", 
"tambour", "tortue", "tripode", "travail", "tuile", "vie", "vieux", "voler"]
var alea = null

func _ready() -> void:
	
	var level1 = [
	[0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
	[0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0],
	[0, 1, 2, 3, 3, 3, 3, 3, 3, 3, 2, 1, 0, 0],
	[1, 2, 3, 4, 4, 4, 4, 4, 4, 3, 2, 1, 0, 0],
	[1, 2, 3, 4, 4, 4, 4, 4, 4, 3, 2, 1, 0, 0],
	[1, 2, 3, 4, 4, 4, 4, 4, 4, 3, 2, 1, 0, 0],
	[0, 1, 2, 3, 3, 3, 3, 3, 3, 2, 1, 0, 0, 0],
	[0, 0, 1, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0],
	[0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0]
	]
	var level2 = [
	[0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
	[0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0],
	[0, 0, 1, 2, 3, 3, 3, 3, 3, 3, 2, 1, 0, 0],
	[0, 1, 2, 3, 4, 4, 4, 4, 4, 3, 2, 1, 0, 0],
	[0, 1, 2, 3, 4, 4, 4, 4, 4, 3, 2, 1, 0, 0],
	[0, 1, 2, 3, 4, 4, 4, 4, 4, 3, 2, 1, 0, 0],
	[0, 0, 1, 2, 3, 3, 3, 3, 3, 3, 2, 1, 0, 0],
	[0, 0, 0, 1, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0],
	[0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0]
	]
	var level3 = [
	[0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0],
	[0, 0, 0, 2, 3, 3, 3, 3, 3, 2, 2, 0, 0, 0],
	[0, 0, 2, 3, 4, 4, 4, 4, 3, 3, 2, 0, 0, 0],
	[0, 2, 3, 4, 4, 4, 4, 4, 3, 3, 2, 0, 0, 0],
	[0, 2, 3, 4, 4, 4, 4, 4, 4, 3, 2, 2, 0, 0],
	[0, 2, 3, 4, 4, 4, 4, 4, 4, 3, 2, 2, 0, 0],
	[0, 0, 2, 3, 4, 4, 4, 4, 3, 3, 2, 0, 0, 0],
	[0, 0, 0, 2, 3, 3, 3, 3, 3, 2, 2, 0, 0, 0],
	[0, 0, 0, 2, 3, 4, 4, 4, 3, 2, 1, 0, 0, 0]
	]
	var level4 = [
	[0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
	[0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0],
	[1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 2, 1, 0, 0],
	[1, 2, 3, 4, 4, 4, 4, 4, 4, 3, 2, 1, 0, 0],
	[1, 2, 3, 4, 4, 4, 4, 4, 4, 3, 2, 1, 0, 0],
	[1, 2, 3, 4, 4, 4, 4, 4, 4, 3, 2, 1, 0, 0],
	[0, 1, 2, 3, 3, 3, 3, 3, 3, 2, 1, 0, 0, 0],
	[0, 1, 2, 3, 4, 4, 4, 4, 3, 2, 1, 0, 0, 0],
	[0, 0, 1, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0]
	]
	var level5 = [
	[0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
	[0, 0, 1, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0],
	[0, 1, 2, 3, 3, 3, 3, 2, 2, 1, 0, 0, 0, 0],
	[1, 2, 3, 4, 4, 4, 3, 3, 2, 1, 0, 0, 0, 0],
	[1, 2, 3, 4, 4, 3, 3, 2, 1, 0, 0, 0, 0, 0],
	[1, 2, 3, 4, 3, 2, 2, 1, 0, 0, 0, 0, 0, 0],
	[1, 2, 3, 3, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0],
	[0, 1, 2, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	]
	var level6 = [
	[0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
	[0, 0, 1, 2, 2, 2, 2, 1, 1, 0, 0, 0, 0, 0],
	[0, 1, 2, 3, 3, 3, 2, 2, 1, 0, 0, 0, 0, 0],
	[1, 2, 3, 4, 4, 3, 3, 2, 1, 0, 0, 0, 0, 0],
	[1, 2, 3, 4, 3, 2, 2, 1, 0, 0, 0, 0, 0, 0],
	[1, 2, 3, 4, 3, 2, 2, 1, 0, 0, 0, 0, 0, 0],
	[1, 2, 3, 4, 3, 2, 2, 1, 0, 0, 0, 0, 0, 0],
	[0, 1, 2, 3, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	]
	
	var aleaLvl = randi() % 6
	if aleaLvl == 0:
		create_level(level1)
	elif aleaLvl == 1:
		create_level(level2)
	elif aleaLvl == 2:
		create_level(level3)
	elif aleaLvl == 3:
		create_level(level4)
	elif aleaLvl == 4:
		create_level(level5)
	elif aleaLvl == 5:
		create_level(level6)
	
	aleaLvl = randi() % 5
	if aleaLvl == 0:
		$background1.visible = true
		$musique1.play(0)
	elif aleaLvl == 1:
		$background2.visible = true
		$musique2.play(0)
	elif aleaLvl == 2:
		$background3.visible = true
		$musique3.play(0)
	elif aleaLvl == 3:
		$background4.visible = true
		$musique4.play(0)
	elif aleaLvl == 4:
		$background5.visible = true
		$musique5.play(0)
		
	
	
func create_level(lvl):
	for i in 14:
		for j in 9:
			if lvl[j][i] == 0:
				pass
			elif lvl[j][i] == 1:
				alea = randi() % caracteres_du_niveau.size()
				_instantiate_tile(f1x(i), f1y(j), caracteres_du_niveau[alea], 1)
				
			elif lvl[j][i] == 2:
				alea = randi() % caracteres_du_niveau.size()
				_instantiate_tile(f1x(i), f1y(j), caracteres_du_niveau[alea], 1)
				alea = randi() % caracteres_du_niveau.size()
				_instantiate_tile(f2x(i), f2y(j), caracteres_du_niveau[alea], 2)
			
			elif lvl[j][i] == 3:
				alea = randi() % caracteres_du_niveau.size()
				_instantiate_tile(f1x(i), f1y(j), caracteres_du_niveau[alea], 1)
				alea = randi() % caracteres_du_niveau.size()
				_instantiate_tile(f2x(i), f2y(j), caracteres_du_niveau[alea], 2)
				alea = randi() % caracteres_du_niveau.size()
				_instantiate_tile(f3x(i), f3y(j), caracteres_du_niveau[alea], 3)
				
			elif lvl[j][i] == 4:
				alea = randi() % caracteres_du_niveau.size()
				_instantiate_tile(f1x(i), f1y(j), caracteres_du_niveau[alea], 1)
				alea = randi() % caracteres_du_niveau.size()
				_instantiate_tile(f2x(i), f2y(j), caracteres_du_niveau[alea], 2)
				alea = randi() % caracteres_du_niveau.size()
				_instantiate_tile(f3x(i), f3y(j), caracteres_du_niveau[alea], 3)
				alea = randi() % caracteres_du_niveau.size()
				_instantiate_tile(f4x(i), f4y(j), caracteres_du_niveau[alea], 4)
		
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
	if tile1.caractere == "bamboo":
		$animation/image_caractere.texture = load("res://sprites/caracteres/bamboo.png") as Texture2D
		$animation/pinyin.text = "zhu"
		$animation/francais.text = "Bamboo"
		$animation/caractere.text = "竹"
	elif tile1.caractere == "bleu":
		$animation/image_caractere.texture = load("res://sprites/caracteres/bleu.png") as Texture2D
		$animation/pinyin.text = "qing"
		$animation/francais.text = "Bleu"
		$animation/caractere.text = "青"
	elif tile1.caractere == "blé":
		$animation/image_caractere.texture = load("res://sprites/caracteres/blé.png") as Texture2D
		$animation/pinyin.text = "mai"
		$animation/francais.text = "Blé"
		$animation/caractere.text = "麦"
	elif tile1.caractere == "broderie":
		$animation/image_caractere.texture = load("res://sprites/caracteres/broderie.png") as Texture2D
		$animation/pinyin.text = "xiu"
		$animation/francais.text = "Broderie"
		$animation/caractere.text = "绣"
	elif tile1.caractere == "cerf":
		$animation/image_caractere.texture = load("res://sprites/caracteres/cerf.png") as Texture2D
		$animation/pinyin.text = "lu"
		$animation/francais.text = "Cerf"
		$animation/caractere.text = "鹿"
	elif tile1.caractere == "chanvre":
		$animation/image_caractere.texture = load("res://sprites/caracteres/chanvre.png") as Texture2D
		$animation/pinyin.text = "ma"
		$animation/francais.text = "Chanvre"
		$animation/caractere.text = "麻"
	elif tile1.caractere == "chariot":
		$animation/image_caractere.texture = load("res://sprites/caracteres/chariot.png") as Texture2D
		$animation/pinyin.text = "che"
		$animation/francais.text = "Chariot"
		$animation/caractere.text = "车"
	elif tile1.caractere == "cheval":
		$animation/image_caractere.texture = load("res://sprites/caracteres/cheval.png") as Texture2D
		$animation/pinyin.text = "ma"
		$animation/francais.text = "Cheval"
		$animation/caractere.text = "马"
	elif tile1.caractere == "cochon":
		$animation/image_caractere.texture = load("res://sprites/caracteres/cochon.png") as Texture2D
		$animation/pinyin.text = "Shi"
		$animation/francais.text = "Cochon"
		$animation/caractere.text = "豕"
	elif tile1.caractere == "coeur":
		$animation/image_caractere.texture = load("res://sprites/caracteres/coeur.png") as Texture2D
		$animation/pinyin.text = "xin"
		$animation/francais.text = "Cœur"
		$animation/caractere.text = "心"
	elif tile1.caractere == "coquillage":
		$animation/image_caractere.texture = load("res://sprites/caracteres/coquillage.png") as Texture2D
		$animation/pinyin.text = "bei"
		$animation/francais.text = "Coquillage"
		$animation/caractere.text = "贝"
	elif tile1.caractere == "couteau":
		$animation/image_caractere.texture = load("res://sprites/caracteres/couteau.png") as Texture2D
		$animation/pinyin.text = "Dao"
		$animation/francais.text = "Couteau"
		$animation/caractere.text = "刀"
	elif tile1.caractere == "dent":
		$animation/image_caractere.texture = load("res://sprites/caracteres/dent.png") as Texture2D
		$animation/pinyin.text = "chi"
		$animation/francais.text = "Dent"
		$animation/caractere.text = "齿"
	elif tile1.caractere == "dragon":
		$animation/image_caractere.texture = load("res://sprites/caracteres/dragon.png") as Texture2D
		$animation/pinyin.text = "long"
		$animation/francais.text = "Dragon"
		$animation/caractere.text = "龙"
	elif tile1.caractere == "flute":
		$animation/image_caractere.texture = load("res://sprites/caracteres/flute.png") as Texture2D
		$animation/pinyin.text = "di"
		$animation/francais.text = "Flûte"
		$animation/caractere.text = "龠"
	elif tile1.caractere == "grenouille":
		$animation/image_caractere.texture = load("res://sprites/caracteres/grenouille.png") as Texture2D
		$animation/pinyin.text = "qiao"
		$animation/francais.text = "Grenouille"
		$animation/caractere.text = "黾"
	elif tile1.caractere == "jaune":
		$animation/image_caractere.texture = load("res://sprites/caracteres/jaune.png") as Texture2D
		$animation/pinyin.text = "huang"
		$animation/francais.text = "Jaune"
		$animation/caractere.text = "黄"
	elif tile1.caractere == "maladie":
		$animation/image_caractere.texture = load("res://sprites/caracteres/maladie.png") as Texture2D
		$animation/pinyin.text = "chuang"
		$animation/francais.text = "Maladie"
		$animation/caractere.text = "疒"
	elif tile1.caractere == "manger":
		$animation/image_caractere.texture = load("res://sprites/caracteres/manger.png") as Texture2D
		$animation/pinyin.text = "shi"
		$animation/francais.text = "Manger"
		$animation/caractere.text = "饣"
	elif tile1.caractere == "matin":
		$animation/image_caractere.texture = load("res://sprites/caracteres/matin.png") as Texture2D
		$animation/pinyin.text = "chen"
		$animation/francais.text = "Matin"
		$animation/caractere.text = "辰"
	elif tile1.caractere == "nez":
		$animation/image_caractere.texture = load("res://sprites/caracteres/nez.png") as Texture2D
		$animation/pinyin.text = "bi"
		$animation/francais.text = "Nez"
		$animation/caractere.text = "鼻"
	elif tile1.caractere == "noir":
		$animation/image_caractere.texture = load("res://sprites/caracteres/noir.png") as Texture2D
		$animation/pinyin.text = "hei"
		$animation/francais.text = "Noir"
		$animation/caractere.text = "黑"
	elif tile1.caractere == "oeil":
		$animation/image_caractere.texture = load("res://sprites/caracteres/oeil.png") as Texture2D
		$animation/pinyin.text = "mu"
		$animation/francais.text = "Œil"
		$animation/caractere.text = "目"
	elif tile1.caractere == "oiseau":
		$animation/image_caractere.texture = load("res://sprites/caracteres/oiseau.png") as Texture2D
		$animation/pinyin.text = "Zhui"
		$animation/francais.text = "Oiseau"
		$animation/caractere.text = "隹"
	elif tile1.caractere == "oiseau2":
		$animation/image_caractere.texture = load("res://sprites/caracteres/oiseau2.png") as Texture2D
		$animation/pinyin.text = "niao"
		$animation/francais.text = "Oiseau 2"
		$animation/caractere.text = "鸟"
	elif tile1.caractere == "pasteque":
		$animation/image_caractere.texture = load("res://sprites/caracteres/pasteque.png") as Texture2D
		$animation/pinyin.text = "Gua"
		$animation/francais.text = "Pastèque"
		$animation/caractere.text = "瓜"
	elif tile1.caractere == "pluie":
		$animation/image_caractere.texture = load("res://sprites/caracteres/pluie.png") as Texture2D
		$animation/pinyin.text = "yu"
		$animation/francais.text = "Pluie"
		$animation/caractere.text = "雨"
	elif tile1.caractere == "rouge":
		$animation/image_caractere.texture = load("res://sprites/caracteres/rouge.png") as Texture2D
		$animation/pinyin.text = "chi"
		$animation/francais.text = "Rouge"
		$animation/caractere.text = "赤"
	elif tile1.caractere == "sel":
		$animation/image_caractere.texture = load("res://sprites/caracteres/sel.png") as Texture2D
		$animation/pinyin.text = "lu"
		$animation/francais.text = "Sel"
		$animation/caractere.text = "卤"
	elif tile1.caractere == "souris":
		$animation/image_caractere.texture = load("res://sprites/caracteres/souris.png") as Texture2D
		$animation/pinyin.text = "shu"
		$animation/francais.text = "Souris"
		$animation/caractere.text = "鼠"
	elif tile1.caractere == "tambour":
		$animation/image_caractere.texture = load("res://sprites/caracteres/tambour.png") as Texture2D
		$animation/pinyin.text = "gu"
		$animation/francais.text = "Tambour"
		$animation/caractere.text = "鼓"
	elif tile1.caractere == "tortue":
		$animation/image_caractere.texture = load("res://sprites/caracteres/tortue.png") as Texture2D
		$animation/pinyin.text = "gui"
		$animation/francais.text = "Tortue"
		$animation/caractere.text = "龟"
	elif tile1.caractere == "tripode":
		$animation/image_caractere.texture = load("res://sprites/caracteres/tripode.png") as Texture2D
		$animation/pinyin.text = "san"
		$animation/francais.text = "Tripode"
		$animation/caractere.text = "三"
	elif tile1.caractere == "travail":
		$animation/image_caractere.texture = load("res://sprites/caracteres/travail.png") as Texture2D
		$animation/pinyin.text = "gong"
		$animation/francais.text = "Travail"
		$animation/caractere.text = "工"
	elif tile1.caractere == "tuile":
		$animation/image_caractere.texture = load("res://sprites/caracteres/tuile.png") as Texture2D
		$animation/pinyin.text = "wa"
		$animation/francais.text = "Tuile"
		$animation/caractere.text = "瓦"
	elif tile1.caractere == "vie":
		$animation/image_caractere.texture = load("res://sprites/caracteres/vie.png") as Texture2D
		$animation/pinyin.text = "sheng"
		$animation/francais.text = "Vie"
		$animation/caractere.text = "生"
	elif tile1.caractere == "vieux":
		$animation/image_caractere.texture = load("res://sprites/caracteres/vieux.png") as Texture2D
		$animation/pinyin.text = "lao"
		$animation/francais.text = "Vieux"
		$animation/caractere.text = "老"
	elif tile1.caractere == "voler":
		$animation/image_caractere.texture = load("res://sprites/caracteres/voler.png") as Texture2D
		$animation/pinyin.text = "fei"
		$animation/francais.text = "Voler"
		$animation/caractere.text = "飞"
		
	$animation.visible = true
	$animation/Timer.start()
	
func f1x(_a):
	return (_a * 62 +250)*0.8
	
func f2x(_a):
	return (_a * 62 -7 +250)*0.8

func f3x(_a):
	return (_a * 62 -14 +250)*0.8
	
func f4x(_a):
	return (_a * 62 -21 +250)*0.8
	
func f4xx(_a):
	return (_a * 62 -21 + 31 +250)*0.8
	
func f1y(_a):
	return (_a * 77 +250)*0.8
	
func f2y(_a):
	return (_a * 77-7 +250)*0.8

func f3y(_a):
	return (_a * 77-14 +250)*0.8
	
func f4y(_a):
	return (_a * 77-21 +250)*0.8
	
func f4yy(_a):
	return (_a * 77-21 + 37 +250)*0.8

func _on_retour_button_pressed() -> void:
	emit_signal("retour")

func _on_nouvelle_partie_button_pressed() -> void:
	emit_signal("relance")

func _on_retour_menu_button_pressed() -> void:
	emit_signal("retour")
