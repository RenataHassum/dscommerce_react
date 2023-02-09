import './styles.css';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FormInput from '../../../../components/FormInput';
import * as forms from '../../../../utils/forms';
import FormTextArea from '../../../../components/FormTextArea';
import { CategoryDTO } from '../../../../models/category';
import * as productService from '../../../../services/product-service';
import * as categoryService from '../../../../services/category-service';
import FormSelect from '../../../../components/FormSelect';
import { selectStyles } from '../../../../utils/select';

export default function ProductForm() {
  const navigate = useNavigate();
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
    categories: {
      value: [],
      id: 'categories',
      name: 'categories',
      placeholder: 'Categorias',
      validation: function (value: CategoryDTO[]) {
        return value.length > 0;
      },
      message: 'Escolha uma categoria',
    },
  });

  const [categories, setCategories] = useState<CategoryDTO[]>([]);

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

  function handleSubmit(event: any) {
    event.preventDefault();
    const formDataValidated = forms.dirtyAndValidateAll(formData);
    if (forms.hasAnyInvalid(formDataValidated)) {
      setFormData(formDataValidated);
      return;
    }
    const requestBody = forms.toValues(formData);
    if (isEditing) {
      requestBody.id = params.productId;
    }

    const request = isEditing
      ? productService.updateRequest(requestBody)
      : productService.insertRequest(requestBody);
    request.then((response) => {
      navigate('/admin/products');
    });
  }

  return (
    <main>
      <section id="product-form-section" className="dsc-container">
        <div className="dsc-product-form-container">
          <form className="dsc-card dsc-form" onSubmit={handleSubmit}>
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
                <FormSelect
                  {...formData.categories}
                  options={categories}
                  onChange={(obj: any) => {
                    const newFormData = forms.updateAndValidate(
                      formData,
                      'categories',
                      obj,
                    );
                    setFormData(newFormData);
                  }}
                  onTurnDirty={handleOnTurnDirty}
                  className="dsc-form-control dsc-form-select-container"
                  styles={selectStyles}
                  isMulti
                  getOptionLabel={(obj: any) => obj.name}
                  getOptionValue={(obj: any) => String(obj.id)}
                />
                <div className="dsc-form-error">
                  {formData.categories.message}
                </div>
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
