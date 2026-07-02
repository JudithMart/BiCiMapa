import ButtonPink from "../../../shared/components/ButtonPink";
import RouteInfo from "../BicitasRoute/RouteInfo";
import RoutePlaces from "../BicitasRoute/RoutePlaces";

function RoutesBicitasForm({ form, setForm, onSave, lugares }) {
  return (
    <div className="w-full px-8 pb-8">
      <div className="grid lg:grid-cols-2 gap-10">
        <RouteInfo form={form} setForm={setForm} />

        <RoutePlaces form={form} setForm={setForm} lugares={lugares} />
      </div>

      <div className="flex justify-center mt-10">
        <ButtonPink
          texto="Guardar ruta"
          px="px-6"
          onClick={() => onSave(form)}
        />
      </div>
    </div>
  );
}

export default RoutesBicitasForm;
