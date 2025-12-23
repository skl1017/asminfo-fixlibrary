from sqlmodel import Session, select

def seed_elements(engine, file, model):
    file_set = {line.strip().lower() for line in open(file) if line.strip()}

    with Session(engine) as session:
        db_objects = session.exec(select(model)).all()
        
        name_to_obj = {obj.name.lower(): obj for obj in db_objects}
        db_names_set = set(name_to_obj.keys())

        to_add = file_set - db_names_set
        if to_add:
            session.add_all([model(name=name.title()) for name in to_add])
        
        to_delete_names = db_names_set - file_set
        for name in to_delete_names:
            obj_to_del = name_to_obj[name]
            session.delete(obj_to_del)

        session.commit()



