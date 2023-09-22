import React, { useEffect, useState } from 'react'

const Filter = ({filter, setFilter}) => {
  return (
    <div className='filter shadow container'>
        <form>
            <div className='field'>
                <label>Filtrar Gastos</label>
                <select
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                >
                    <option value="">-- Todas las categorías --</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="gastosVarios">Gastos Varios</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscripciones</option>
                </select>
            </div>
        </form>
    </div>
  )
}

export default Filter