import os

with open("soundsData.ts", "w") as f:
    # import all the sound files
    sound_files = [file for file in os.listdir(".") if file.endswith(".mp3")]
    note_names = []
    for sound_file in sound_files:
        # remove last 4 characters from sound_file (.mp3)
        note_name = sound_file[:-4]
        note_names.append(note_name)
        f.write(f"import {note_name} from '../sounds/{note_name}.mp3';")

    # import Sound typescript type
    f.write("import { Sound } from '../../types';")

    # create const sounds that contain note objects
    f.write("const sounds: Sound[] = [")
    note_objects = [
        f"{{ path: {note_name}, name: '{note_name}' }}," for note_name in note_names
    ]
    for note_object in note_objects:
        # ignore sounds in the 6th register (too high!)
        if "6" in note_object:
            continue
        f.write(note_object)
    f.write("];")

    f.write("export default sounds;")
