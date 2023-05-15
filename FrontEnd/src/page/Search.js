import moment from 'moment';

const Search = (props) => {
  const { isOpenSearch, searchData } = props;

  return (
  <>
  <div class="modal" tabindex="-1" style={{ display: isOpenSearch ? "block" : "none" }}>
    <div class="modal-dialog modal-md modal-dialog-centered">
        <div class="modal-content">
        <div class="modal-header" style={{backgroundColor: '#537557'}}>
            {searchData.users && searchData.users.map((user) => (
            <h5 key={user.id} class="modal-title">
                {user.fname} {user.lname} schedule for today
            </h5>
            ))} 
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={props.toggleModal}></button>
        </div>
        <div class="modal-body">
        {searchData && searchData.events && searchData.events.length > 0 ? (
        searchData.events.map((event) => (
            <div key={event.id} className="dash card" style={{backgroundColor: event.color, margin: '10px', color: 'white', padding: '10px 20px 10px 0'}} data-bs-toggle="tooltip" data-bs-class="custom-tooltip" data-bs-placement="bottom">
            <ul style={{listStyleType: 'none', marginTop: '12px'}}> 
                <li style={{fontSize: 'larger', fontWeight: 'bold'}}>{event.title}</li>
                <li>{event.description}</li>
                <li><small>{moment(event.start).format('hh:mm a')}</small> - <small>{moment(event.end).format('hh:mm a')}</small></li>
            </ul>
            </div>
        ))
        ) : (
            <div>No appointment found.</div>
        )}
        </div>
        </div>
    </div>
  </div>
  </>
  )
}

export default Search