import './styles.css';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import FormInput from '../../../../components/FormInput';
import * as forms from '../../../../utils/forms';
import FormTextArea from '../../../../components/FormTextArea';
import Select from 'react-select';
import { CategoryDTO } from '../../../../models/category';
import * as productService from '../../../../services/product-service';
import * as categoryService from '../../../../services/category-service';

export default function ProductForm() {
  const [categories, setCategories] = useState<CategoryDTO[]>([]);

  const params = useParams();

  const isEditing = params.productId !== 'create';

  const [formData, setFormData] = useState<any>({
    name: {
      value: '',
      id: 'name',
      name: 'name',
      type: 'text',
      placeholder: 'Nome',
      validation: function (value: string) {
        return /^.{3,80}$/.test(value);
      },
      message: 'Favor informar nome de 3 a 80 caracteres',
    },
    price: {
      value: '',
      id: 'price',
      name: 'price',
      type: 'number',
      placeholder: 'Preço',
      validation: function (value: any) {
        return Number(value) > 0;
      },
      message: 'Favor informar um valor válido',
    },
    imgUrl: {
      value: '',
      id: 'imgUrl',
      name: 'imgUrl',
      type: 'text',
      placeholder: 'Imagem',
    },
    description: {
      value: '',
      id: 'description',
      name: 'description',
      type: 'text',
      placeholder: 'Descrição',
      validation: function (value: string) {
        return /^.{10,}$/.test(value);
      },
      message: 'Descrição com mínimo de 10 caracteres',
    },
  });

  useEffect(() => {
    categoryService.findAllRequest().then((response) => {
      setCategories(response.data);
    });
  }, []);

  useEffect(() => {
    if (isEditing) {
      productService.findById(Number(params.productId)).then((response) => {
        const newUpdateFormData = forms.updateAll(formData, response.data);
        setFormData(newUpdateFormData);
      });
    }
  }, []);

  function handleInputChange(event: any) {
    setFormData(
      forms.updateAndValidate(formData, event.target.name, event.target.value),
    );
  }

  function handleOnTurnDirty(name: string) {
    setFormData(forms.dirtyAndValidate(formData, name));
  }

  return (
    <main>
      <section id="product-form-section" className="dsc-container">
        <div className="dsc-product-form-container">
          <form className="dsc-card dsc-form">
            <h2>Dados do produto</h2>
            <div className="dsc-form-controls-container">
              <div>
                <FormInput
                  {...formData.name}
                  onChange={handleInputChange}
                  onTurnDirty={handleOnTurnDirty}
                  className="dsc-form-control"
                />
                <div className="dsc-form-error">{formData.name.message}</div>
              </div>
              <div>
                <FormInput
                  {...formData.price}
                  onChange={handleInputChange}
                  onTurnDirty={handleOnTurnDirty}
                  className="dsc-form-control"
                />
                <div className="dsc-form-error">{formData.price.message}</div>
              </div>
              <div>
                <FormInput
                  {...formData.imgUrl}
                  onChange={handleInputChange}
                  onTurnDirty={handleOnTurnDirty}
                  className="dsc-form-control"
                />
              </div>

              <div>
                <Select
                  options={categories}
                  isMulti
                  getOptionLabel={(obj) => obj.name}
                  getOptionValue={(obj) => String(obj.id)}
                />
              </div>

              <div>
                <FormTextArea
                  {...formData.description}
                  onChange={handleInputChange}
                  onTurnDirty={handleOnTurnDirty}
                  className="dsc-form-control dsc-textarea"
                />
                <div className="dsc-form-error">
                  {formData.description.message}
                </div>
              </div>
            </div>

            <div className="dsc-product-form-buttons">
              <Link to="/admin/products">
                <button type="reset" className="dsc-btn dsc-btn-white">
                  Cancelar
                </button>
              </Link>

              <button type="submit" className="dsc-btn dsc-btn-blue">
                Salvar
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
