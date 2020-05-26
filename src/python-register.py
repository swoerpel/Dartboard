#! /usr/bin/env python
from gimpfu import *

def bold_edges(*args):
  img = gimp.image_list()[0]
  L1 = img.layers[0]
  L2 = L1.copy()
  pdb.plug_in_edge(img,L1, 10, 0, 0) # amount, WRAP, SOBEL FINALLY CORRECT SYNTAX
  pdb.gimp_image_select_color (img , CHANNEL_OP_REPLACE, L1, (0,0,0))
  pdb.gimp_edit_cut(L1)
  pdb.gimp_selection_invert(img)
  pdb.gimp_selection_grow(img, 😎
  pdb.gimp_drawable_edit_fill(L1,FILL_FOREGROUND)
  pdb.gimp_selection_none(img)
  img.add_layer(L2,0)
  pdb.gimp_image_raise_item_to_top(img,L1)
  img.flatten()

  # pdb.gimp_file_save(img, img.layers[0], 'image.jpg', '?')

register(
  "bold_edges", "", "", "", "", "",
  "<Toolbox>/Xtns/Languages/Python-Fu/_Bold Edges", "",
  [
  # (PF_STRING, "arg0", "argument 0", "test string"),
  # (PF_INT,    "arg1", "argument 1", 100          ),
  # (PF_FLOAT,  "arg2", "argument 2", 1.2          ),
  # (PF_COLOR,  "arg3", "argument 3", (0, 0, 0)    ),
  ],
  [],
  bold_edges
  )
 
main()

# #! /usr/bin/env python
# from gimpfu import *

# def echo(*args):
#   """Print the arguments on standard output"""
#   print "echo:", args

# register(
#   "console_echo", "", "", "", "", "",
#   "<Toolbox>/Xtns/Languages/Python-Fu/Test/_Console Echo", "",
#   [
#   (PF_STRING, "arg0", "argument 0", "test string"),
#   (PF_INT,    "arg1", "argument 1", 100          ),
#   (PF_FLOAT,  "arg2", "argument 2", 1.2          ),
#   (PF_COLOR,  "arg3", "argument 3", (0, 0, 0)    ),
#   ],
#   [],
#   echo
#   )

# main()